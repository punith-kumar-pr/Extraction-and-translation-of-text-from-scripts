var loadFile = function (event) {
    var image = document.getElementById('output');
    image.src = URL.createObjectURL(event.target.files[0]);
};


// ----> First Video <-----

// const img_input = document.querySelector("#img_input");
//         var uploaded_img = "";

//         img_input.addEventListener("change", function(){
//             reader.addEventListener("load", ()=>{
//                 uploaded_img = reader.result;
//                 document.querySelector("#display_image").style.backgroundImage = `url(${uploaded_img})`;
//             });
//             reader.readAsDataURL(this.files[0]);
//         });




// -------> Second Video <------
// const display = document.querySelector(".display");
// const input = document.querySelector("#upload");
// let img = document.querySelector("img");

// input.addEventListener("change", () => {
//   let reader = new FileReader();
//   reader.readAsDataURL(input.files[0]);
//   reader.addEventListener("load", () => {
//     display.innerHTML = `<img src=${reader.result} alt=''/>`;
//   });
// });


// ------> Chat GPT <--------
// function uploadImage() {
// 	let input = document.getElementById('image-input');
// 	let container = document.getElementById('image-container');

// 	if (input.files && input.files[0]) {
// 		let reader = new FileReader();

// 		reader.onload = function(e) {
// 			container.innerHTML = '<img src="' + e.target.result + '">';
// 		}

// 		reader.readAsDataURL(input.files[0]);
// 	}
// }
