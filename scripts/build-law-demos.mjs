import { cpSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, extname, resolve, join } from 'node:path';
const root = resolve('demo-sources/abogados');
const variants = JSON.parse(readFileSync(join(root, 'variants.json'), 'utf8'));
for (const variant of variants) {
  const slug = `abogados-${variant.id}`;
  const base = `/demos/${slug}`;
  const url = `https://www.oriavision.com.ar${base}/`;
  const whatsapp = `https://wa.me/5491127575675?text=${encodeURIComponent(`Hola, ORIAVISION. Me interesa la familia Estudio jurídico, variante ${variant.name}. Vi este diseño: ${url}`)}`;
  const output = resolve('public/demos', slug);
  const replace = (s, canonical = url) => s.replaceAll('{{BASE}}', base).replaceAll('{{URL}}', url).replaceAll('{{WHATSAPP}}', whatsapp).replaceAll('{{VARIANT}}', variant.name).replaceAll('{{CANONICAL}}', canonical);
  function copyAssets(dir, target) {
    mkdirSync(target, {recursive:true});
    for (const file of readdirSync(dir, {withFileTypes:true})) {
      if (file.isDirectory()) copyAssets(join(dir,file.name),join(target,file.name));
      else if (extname(file.name)==='.css') writeFileSync(join(target,file.name),replace(readFileSync(join(dir,file.name),'utf8')));
      else cpSync(join(dir,file.name),join(target,file.name));
    }
  }
  copyAssets(join(root,variant.id,'assets'),output);
  for (const file of ['demo.js','demo.css']) cpSync(join(root,file),join(output,file));
  const manifest = JSON.parse(readFileSync(join(root,variant.id,'manifest.json'),'utf8'));
  for (const page of manifest.pages) {
    const relative = page==='/' ? '' : page.slice(1)+'/';
    const source = join(root,variant.id,'pages',page==='/'?'index':page.slice(1),'index.html');
    const target = join(output,relative,'index.html');
    mkdirSync(dirname(target),{recursive:true});
    writeFileSync(target,replace(readFileSync(source,'utf8'),url+relative));
  }
  console.log(`${slug}: ${manifest.pages.length} páginas compiladas`);
}
