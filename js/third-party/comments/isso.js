document.addEventListener("page:loaded",()=>{CONFIG.page.comments&&NexT.utils.loadComments("#isso-thread").then(()=>NexT.utils.getScript(`${CONFIG.isso}js/embed.min.js`,{attributes:{dataset:{isso:`${CONFIG.isso}`}},parentNode:document.querySelector("#isso-thread")}))});