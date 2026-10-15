// Original vector artwork. Run manually when the illustrations change.
// The responsive WebPs are committed, so publishing a guide needs no image service.
import sharp from 'sharp';
import { mkdir, writeFile } from 'node:fs/promises';

const web = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
<rect width="1200" height="630" fill="#eff3eb"/>
<circle cx="940" cy="125" r="230" fill="#e1e9d9"/><circle cx="150" cy="630" r="260" fill="#e6dcc1"/>
<path d="M80 180H290M960 480H1120" stroke="#cfdbcb" stroke-width="2"/>
<ellipse cx="606" cy="521" rx="392" ry="27" fill="#173f31" opacity=".08"/>
<rect x="276" y="132" width="619" height="371" rx="24" fill="#163e31"/>
<rect x="290" y="147" width="591" height="336" rx="13" fill="#fffdf7"/>
<path d="M290 185H881" stroke="#dce5da" stroke-width="2"/>
<g fill="#a6b6a3"><circle cx="313" cy="166" r="4"/><circle cx="329" cy="166" r="4"/><circle cx="345" cy="166" r="4"/></g>
<rect x="322" y="216" width="65" height="12" rx="6" fill="#187956"/>
<rect x="712" y="219" width="42" height="6" rx="3" fill="#a6b6a3"/><rect x="772" y="219" width="69" height="6" rx="3" fill="#a6b6a3"/>
<rect x="322" y="271" width="204" height="17" rx="6" fill="#163e31"/><rect x="322" y="300" width="156" height="17" rx="6" fill="#163e31"/>
<path d="M325 345H510M325 360H484" stroke="#a6b6a3" stroke-width="7" stroke-linecap="round"/>
<rect x="322" y="394" width="113" height="32" rx="16" fill="#c49b45"/>
<rect x="573" y="263" width="268" height="177" rx="12" fill="#d9e5d7"/>
<path d="M573 414L649 325L728 408L776 353L841 417V428Q841 440 829 440H585Q573 440 573 428Z" fill="#7c9f7c"/>
<circle cx="780" cy="304" r="19" fill="#f3d590"/>
<path d="M242 500H930L960 521Q960 535 935 535H238Q212 535 212 521Z" fill="#30634d"/>
<path d="M514 500H658L646 510H526Z" fill="#7da58a"/>
<g transform="rotate(-9 220 320)">
<rect x="107" y="242" width="218" height="262" rx="14" fill="#163e31" opacity=".1"/>
<rect x="100" y="230" width="218" height="262" rx="14" fill="#fffdf7" stroke="#d5dfce" stroke-width="2"/>
<rect x="161" y="213" width="96" height="29" rx="8" fill="#c49b45"/>
<g fill="none" stroke="#187956" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"><path d="M130 281L138 289L151 274M130 330L138 338L151 323M130 379L138 387L151 372"/></g>
<g stroke="#91a791" stroke-width="7" stroke-linecap="round"><path d="M171 283H282M171 332H272M171 381H282M131 436H229"/></g>
</g>
<g transform="rotate(11 951 240)"><rect x="884" y="182" width="133" height="155" rx="10" fill="#fffdf7" stroke="#d5dfce" stroke-width="2"/><rect x="896" y="194" width="109" height="98" rx="6" fill="#c49b45"/><circle cx="951" cy="243" r="28" fill="#f5e7bf"/><path d="M904 312H968" stroke="#9cb299" stroke-width="7" stroke-linecap="round"/></g>
<path d="M1041 353V385M1025 369H1057" stroke="#b6903c" stroke-width="4" stroke-linecap="round"/>
</svg>`;

const google = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
<rect width="1200" height="630" fill="#f4efe2"/><circle cx="123" cy="125" r="239" fill="#e3e9db"/><circle cx="1100" cy="620" r="290" fill="#e9dfc6"/>
<path d="M94 474L235 381L309 435L498 279L637 368L891 214L1092 310M151 168L293 263L440 150M756 512L885 415L1084 465" fill="none" stroke="#d4dccd" stroke-width="25" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M94 474L235 381L309 435L498 279L637 368L891 214L1092 310M151 168L293 263L440 150M756 512L885 415L1084 465" fill="none" stroke="#fffdf7" stroke-width="14" stroke-linecap="round" stroke-linejoin="round"/>
<ellipse cx="595" cy="521" rx="306" ry="25" fill="#173f31" opacity=".09"/>
<rect x="350" y="258" width="411" height="252" rx="9" fill="#fffdf7" stroke="#163e31" stroke-width="5"/>
<rect x="383" y="327" width="168" height="128" rx="5" fill="#dde8d6" stroke="#163e31" stroke-width="4"/>
<path d="M386 413L459 342L507 388L549 348" stroke="#b7ccb1" stroke-width="10" fill="none"/>
<path d="M467 329V453" stroke="#163e31" stroke-width="4"/>
<rect x="588" y="327" width="136" height="183" rx="5" fill="#d1dfc9" stroke="#163e31" stroke-width="4"/>
<rect x="602" y="342" width="108" height="108" rx="3" fill="#e9efe0"/>
<path d="M696 471V489" stroke="#c49b45" stroke-width="6" stroke-linecap="round"/>
<path d="M375 190H736L777 266H334Z" fill="#187956"/>
<path d="M397 190H445L424 266H369ZM493 190H541L536 266H481ZM590 190H638L647 266H592ZM687 190H736L777 266H721Z" fill="#efcf89"/>
<path d="M334 266V284Q361 312 389 284Q416 312 445 284Q473 312 500 284Q528 312 555 284Q583 312 611 284Q639 312 666 284Q694 312 722 284Q750 312 777 284V266Z" fill="#106346"/>
<path d="M389 267V284Q416 312 445 284V267M500 267V284Q528 312 555 284V267M611 267V284Q639 312 666 284V267M722 267V284Q750 312 777 284V267" fill="#d6b160"/>
<g transform="translate(821 97)"><path d="M70 0C30 0 0 30 0 69C0 115 70 176 70 176S140 115 140 69C140 30 110 0 70 0Z" fill="#106346"/><circle cx="70" cy="68" r="28" fill="#f8f2df"/><circle cx="70" cy="68" r="12" fill="#c49b45"/></g>
<g transform="translate(771 349) rotate(-6)"><path d="M0 16Q0 0 16 0H227Q243 0 243 16V102Q243 118 227 118H59L31 143V118H16Q0 118 0 102Z" fill="#fffdf7" stroke="#d5ddcb" stroke-width="2"/>
<g fill="#b08730"><path id="star" d="M44 33L51 47L67 49L55 60L58 76L44 68L30 76L33 60L21 49L37 47Z"/><use href="#star" x="51"/><use href="#star" x="102"/><use href="#star" x="153"/></g></g>
<circle cx="258" cy="299" r="8" fill="#c49b45"/><path d="M233 198V228M218 213H248" stroke="#b6903c" stroke-width="4" stroke-linecap="round"/>
</svg>`;

await mkdir('public/images/guides', { recursive: true });
for (const [name, svg] of [['preparar-web', web], ['perfil-google', google]]) {
  for (const width of [1200, 640]) {
    const buffer = await sharp(Buffer.from(svg)).resize(width).webp({ quality: 84 }).toBuffer();
    const file = `public/images/guides/${name}${width === 640 ? '-640' : ''}.webp`;
    await writeFile(file, buffer);
    console.log(`${file}: ${buffer.length} bytes`);
  }
}
