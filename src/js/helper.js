import { async } from "regenerator-runtime";

export const timeout = function (s) {
    return new Promise(function (_, reject) {
      setTimeout(function () {
        reject(new Error(`Request took too long! Timeout after ${s} second`));
      }, s * 1000);
    });
  };


export const ajax = async function(url,postData=undefined){
try{
  const fetchConfig =!postData ? fetch(url)
  :fetch(url,{
    method:"POST",
    headers:{"Content-Type":"application/json"},
    body: JSON.stringify(postData)
    });


  const res = await Promise.race([fetchConfig,timeout(10)]);
  const data = await res.json();
  if (!res.ok) throw new Error(`${data.message} ${res.status}`);
  return data;
}catch(e){throw e}
};