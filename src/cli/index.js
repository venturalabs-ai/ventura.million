#!/usr/bin/env node
/**
 * CLI do ventura.million
 * Comandos: run | list | export | validate | doctor
 */
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { discover, listAdapters } from '../core/registry.js';
import { run } from '../core/runtime.js';
import { exportPackage } from '../core/exporter.js';
import { validateAll } from '../core/validator.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const args = process.argv.slice(2);
const command = args[0];

async function loadAll() {
  const [agentsResult, skillsResult] = await Promise.all([
    discover('agents'),
    discover('skills')
  ]);
  const adapterNames = await listAdapters();
  return {
    agents: agentsResult.items,
    skills: skillsResult.items,
    adapterNames,
    errors: [...agentsResult.errors, ...skillsResult.errors]
  };
}

async function cmdRun() {
  const promptIdx = args.indexOf('--prompt');
  const prompt = promptIdx !== -1 ? args.slice(promptIdx + 1).join(' ').trim() : '';
  if (!prompt) {
    console.error('Uso: npm start -- --prompt "sua solicitação"');
    process.exit(1);
  }

  const { agents, skills } = await loadAll();
  const result = await run(prompt, agents, skills);

  console.log('✅ Execução concluída (modo local — sem chamada a modelo externo)');
  console.log('📋 Agente selecionado:', result.plan.selectedAgent?.name || 'Nenhum');
  console.log('📚 Skills selecionadas:', result.plan.selectedSkills.map((s) => s.name).join(', ') || 'Nenhuma');
  console.log('🧠 Motivo:', result.plan.routingReason);
  console.log('\n' + '='.repeat(60));
  console.log('INSTRUÇÕES MONTADAS:\n');
  console.log(result.instructions);
  console.log('\n' + '='.repeat(60));
  console.log('ℹ️  Este é um plano montado localmente. Envie o texto acima à IA para obter resposta.');
  console.log('ℹ️  providerResponse: null (modo simulado local)');
}

async function cmdList() {
  const { agents, skills, adapterNames } = await loadAll();
  console.log(`\n🤖 Agentes (${agents.length}):`);
  agents.forEach((a) => console.log(`  • ${a.id}: ${a.name}`));
  console.log(`\n📚 Skills (${skills.length}):`);
  skills.forEach((s) => console.log(`  • ${s.id}: ${s.name}`));
  console.log(`\n🔌 Adaptadores (${adapterNames.length}):`);
  adapterNames.forEach((a) => console.log(`  • ${a}`));
}

async function cmdDoctor() {
  const { agents, skills, adapterNames, errors } = await loadAll();
  const apiVars = Object.keys(process.env).filter((k) => k.endsWith('_API_KEY'));

  console.log('🏥 Diagnóstico do ambiente:\n');
  console.log(`✅ Node.js: ${process.version}`);
  console.log(`✅ Modo local: SEM AUTENTICAÇÃO OBRIGATÓRIA`);
  console.log(`✅ Agentes carregados: ${agents.length}`);
  console.log(`✅ Skills carregadas: ${skills.length}`);
  console.log(`✅ Adaptadores disponíveis: ${adapterNames.length}`);
  if (apiVars.length) {
    console.log(`ℹ️  Variáveis de API configuradas (${apiVars.length}): ${apiVars.join(', ')} (valores não exibidos)`);
  } else {
    console.log('ℹ️  Nenhuma variável de API configurada — modo local funcionando');
  }
  if (errors.length) {
    console.log('\n⚠️ Avisos de carregamento:');
    errors.forEach((e) => console.log('  •', e));
  }
  console.log('\n✅ Sistema pronto para uso local.');
}

async function cmdValidate() {
  const { agents, skills, adapterNames, errors: loadErrors } = await loadAll();
  const { errors, warnings, ok } = validateAll(agents, skills, adapterNames);

  let exitCode = 0;
  if (loadErrors.length) {
    console.error('\n❌ Erros de carregamento:');
    loadErrors.forEach((e) => console.error('  ✗', e));
    exitCode = 1;
  }
  if (errors.length) {
    console.error('\n❌ Erros de validação:');
    errors.forEach((e) => console.error('  ✗', e));
    exitCode = 1;
  }
  if (warnings.length) {
    console.log('\n⚠️ Avisos:');
    warnings.forEach((w) => console.log('  •', w));
  }
  if (ok && loadErrors.length === 0) {
    console.log('\n✅ Validação aprovada');
  }
  process.exit(exitCode);
}

async function cmdExport() {
  const { agents, skills, adapterNames } = await loadAll();
  const { path: outPath, package: pkg } = await exportPackage(agents, skills, adapterNames);
  console.log(`✅ Pacote exportado: ${outPath}`);
  console.log(`📦 Formato: ${pkg.format}`);
  console.log(`🤖 Agentes: ${pkg.agents.length} | 📚 Skills: ${pkg.skills.length} | 🔌 Adaptadores: ${pkg.portability.length}`);
}

async function main() {
  try {
    switch (command) {
      case 'run':
        return await cmdRun();
      case 'list':
        return await cmdList();
      case 'export':
        return await cmdExport();
      case 'validate':
        return await cmdValidate();
      case 'doctor':
        return await cmdDoctor();
      default:
        console.log(`Uso:
  node src/cli/index.js run --prompt "texto"  Executar agente localmente
  node src/cli/index.js list                   Listar agentes e skills
  node src/cli/index.js export                 Gerar pacote portátil
  node src/cli/index.js validate               Validar projeto
  node src/cli/index.js doctor                 Diagnóstico do ambiente`);
        process.exit(command ? 1 : 0);
    }
  } catch (err) {
    console.error('❌ Erro:', err.message);
    process.exit(1);
  }
}

main();
