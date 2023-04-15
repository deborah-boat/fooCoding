
const bookTitles = ["harry_potter", 
"lord_of_the_rings", 
"catcher_in_the_rye", 
"the_gods_are_not_to_blame",
 "pinocchio", "brave_new_world", 
 "animal_farm", "the_great_gatsby",
  "pride_and_prejudice", 
  "cinderella",
];

const booksList = {
 harry_potter :{
    title: "harry potter",
    language: "english",
   author: "J.K Rowling",
},
lord_of_the_rings: {
    title: "lord of the rings",
    language: "english",
   author: "J.R.R.Tolkien",
},
catcher_in_the_rye :{
  title: "catcher in the rye",
    language: "english",
   author: "J.D Salinger",
},
the_gods_are_not_to_blame :{
  title: "the gods are not to blame",
    language: "english",
   author: "Ola Rotimi",
},
 pinocchio :{
   title: "pinocchio",
    language: "english",
   author: "Carlo Collodi",
},
 brave_new_world : {
   title: "brave new world",
    language: "english",
   author: "Aldous Huxley",
},
 animal_farm :{
   title: "animal farm",
    language: "english",
   author: "George Orwell",
},
 the_great_gatsby :{
   title: "the great gatsby",
    language: "english",
   author: "F.Scott Fitzgerald",
},
 pride_and_prejudice :{
   title: "pride and prejusdice",
    language: "english",
   author: "Jane Austen",
},
 cinderella : {
   title: "cinderella",
    language: "english",
   author: "Charles Perrault",
},

};


const booksImages = {
    harry_potter:"img/harry_potter.jpg",
    lord_of_the_rings:"img/the_lord_of_the_rings.jpg",
    catcher_in_the_rye:"img/the_catcher_in_the_rye.jpg",
    the_gods_are_not_to_blame:"img/the_gods_are_not_to_blame.jpg",
    pinocchio:"img/pinocchio.jpg",
    brave_new_world:"img/brave_new_world.jpg",
    animal_farm:"img/animal_farm.jpg",
    the_great_gatsby:"img/the_great_gatsby.jpg",
    pride_and_prejudice:"img/pride_and_prejudice.jpg",
    cinderella:"img/cinderella.jpg",
};

  


const body = document.body;
const ul = document.createElement("ul");
body.appendChild(ul);
const h1 = document.createElement('h1');
h1.innerText = "10 Books i have read";
body.appendChild(h1);

// 1.3

function listBooks(array, objet){
  
//   this code it's for 1.3
//   
//   
  
  // for(let i = 0; i < array.length; i++){
  //   const li = document.createElement("li");
  //   ul.appendChild(li);
  //   li.setAttribute("id", array[i]);
  // }
//   
//   
// 1.5 I modify the create function in 1.3 to be able to do the one in 1.5
  
   for(let i = 0; i < array.length; i++){
    const li = document.createElement("li");
    ul.appendChild(li);
     const text = array[i];
    li.appendChild(header);
    header.setAttribute("id", text);
     header.innerText = objet[text].title;
    const language = document.createElement("h2");
    li.appendChild(language);
    language.innerText = objet[text].language;
    const author = document.createElement("h2");
li.appendChild(author);
author.innerText = objet[text].author;
const img = document.createElement("img");
li.appendChild(img);
    img.src = booksImages[array[i]];
    img.setAttribute("alt",objet[text].title);
  }
  
 }



  
 




listBooks(bookTitles,booksList);












  
















 


       


 
   

















