const {chromium}=require('playwright');
(async()=>{
 const b=await chromium.launch();const p=await b.newPage({viewport:{width:1080,height:1080}});
 await p.goto('file://'+process.cwd()+'/video.html');
 const N=Math.round(54.5*30);
 for(let i=0;i<N;i++){
  await p.evaluate(t=>render(t),i/30);
  await p.screenshot({path:`frames/f${String(i).padStart(5,'0')}.jpg`,type:'jpeg',quality:94});
 }
 await b.close();console.log('done',N);
})();
