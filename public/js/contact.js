   //GET
   fetch('/Gowus')
   .then(function (res) {
       return res.json();
   })
   .then(function (contact) {
       for (let i = 0; i < ContactGowus.length; i++) {
           console.log(ContactGowus);
           document.getElementById("mensaje").innerHTML +=
               `<div><p><strong>${ContactGowus[i].name}</strong></p>
               <p>${ContactGowus[i].name}</p>
               <p>${ContactGowus[i].email}</p>
               <p>${ContactGowus[i].comment}</p>
             
               
               <a href="" onclick="eliminarContacto('${ContactGowus[i].email}')">Eliminar Email</a>  
               </div>`
       }
   })