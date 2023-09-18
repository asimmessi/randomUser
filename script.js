const apiEP = 'https://randomuser.me/api/?results=20';

const countElm= document.getElementById("count");

console.log(countElm);

let userList = [];

const listElm = document.getElementById('list');

const fetchUser = async (url) => {
  try {
    //promise using fetch to fetch data from any server
    /*
  fetch(url)
    .then((dt) => {
      return dt.json();
    })
    .then((data) => {
      userList = data.results;
      display(userList);
    });

    */

    //Async / Await;
    const dt = await fetch(url);
    const data = await dt.json();
    userList = data.results;
    display(userList);
  } catch (error) {
    console.log(error);
  }
};

fetchUser(apiEP);

const display = (users) => {
  let str = '';

  users.map((item, i) => {
    
    str += `
    <div class="card flex-grow-1" style="width: 18rem">
    <img
      src="${item?.picture?.large}"
      class="card-img-top"
      alt="..."
    />
    <div class="card-body">
      <h5 class="card-title">${item.name.title} ${item.name.first} ${item.name.last}</h5>
      <div class="card-text">
        <ul class="list-unstyled">
          <li><i class="fa-solid fa-phone"></i> ${item.phone}</li>
          <li><i class="fa-solid fa-envelope"></i> ${item.email}</li>
          <li><i class="fa-solid fa-location-dot"></i> ${item.location.city}, ${item.location.country}</li>
        </ul>
      </div>
    </div>
  </div>`;
  });
  listElm.innerHTML = str;
  countElm.innerText = users.length;
};



const handleOnGenderSelect = (e) =>{
    console.log(e);
    const g= e.value;
    const url = `${apiEP}&gender=${g}`
    fetchUser(url);
}

document.getElementById("search").addEventListener("keyup", (e)=>{
    const {value} = e.target;

    const filteredArg= userList.filter((usr)=>{
        const fullName= `${usr.name.first} ${usr.name.last}`.toLowerCase();

        if(fullName.includes(value.toLowerCase())){
            return true;

        }
    });
    display(filteredArg);
});