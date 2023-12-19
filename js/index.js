
  
  
  
   var BookmarkName = document.getElementById('BookmarkName')
    var SiteUrl = document.getElementById('SiteUrl')
  var mainIndex=0
  var siteItems
  if (localStorage.getItem('siteItems') != null) {
    siteItems=JSON.parse(localStorage.getItem('siteItems'))
    
  } else {siteItems=[]
    
  }

function addSite() {
  if (validateSiteName(SiteUrl.value)){

     var siteItem = {
        name: BookmarkName.value,
        url: SiteUrl.value,
    }

    if ( BookmarkName.value =='' || SiteUrl.value =='') {
        alert('Error')
        
    } else {
         siteItems.push(siteItem)
    clearSite()
    disPlay()
    console.log(siteItems);
    localStorage.setItem('siteItems' , JSON.stringify(siteItems))
    }
   
  }
   
   
}

function clearSite() {
    BookmarkName.value =''
    SiteUrl.value=''

}

function disPlay() {
var trs=''
    for (var i = 0 ; i < siteItems.length ; i++) {
      
        trs += ` <tr>
        <td>${i+1}</td>
        <td>${siteItems[i].name}</td>
        <td><button onclick="visitItem('http://${siteItems[i].url}')" type="button" class="btn btn-success1 --bs-light-text-emphasis"><i class="fa-solid fa-eye pe-2"></i> visit</button></td>
        <td><button onclick="deleteItem(${i})" type="button" class="btn btn-danger"><i class="fa-solid fa-trash-can pe-2"></i>Delete</button></td>
       </tr>`
    }
   document.getElementById('tBody').innerHTML=trs
} 

function deleteItem(i){

    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: "btn btn-danger mx-1",
          cancelButton: "btn btn-success mx-1"
        },
        buttonsStyling: false
      });
      swalWithBootstrapButtons.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true
      }).then((result) => {
        if (result.isConfirmed) {
            siteItems.splice(i , 1)
            localStorage.setItem("siteItems" , JSON.stringify(siteItems))
            disPlay()
            console.log(siteItems);
          swalWithBootstrapButtons.fire({
            title: "Deleted!",
            text: "Your item has been deleted.",
            icon: "success"
          });
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire({
            title: "Cancelled",
            text: "Your imaginary file is safe :)",
            icon: "error"
          });
        }
      });

}


function visitItem(url){

window.location=url;

  
}

function validateSiteName(siteName) {
  var siteNameRegix =  /^((ftp|http|https):\/\/)?(www.)?(?!.*(ftp|http|https|www.))[a-zA-Z0-9_-]+(\.[a-zA-Z]+)+((\/)[\w#]+)*(\/\w+\?[a-zA-Z0-9_]+=\w+(&[a-zA-Z0-9_]+=\w+)*)?\/?$/gm;
return siteNameRegix.test(siteName)}