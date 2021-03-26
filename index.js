const Input_Text = document.getElementById("Input_Text")
const footer = document.querySelector(".footer")
const text = footer.childNodes[1]
const All = footer.childNodes[3].childNodes[1]
const Active = footer.childNodes[3].childNodes[3]
const Completed = footer.childNodes[3].childNodes[5]
const Clear = footer.childNodes[5]



let counter = 0;
let amount = 0;


const FooterButtons = ()=>{
    const div = document.querySelectorAll("#appendElement")

    Clear.addEventListener("click",()=>{
        div.forEach(element => {
            element.style.display = "none"
            element.returnable = false
            footer.style.display = "none"
        });

        array = []
        Current_Arr = []
        ObjectsArray = []
        localStorage.clear()
        counter = 0
        amount = 0
    })

    All.addEventListener("click",()=>{
        
        div.forEach(element => {
            element.returnable !== false ? element.style.display = "flex" : ""
        });
    })

    Active.addEventListener("click",()=>{
     
        div.forEach(element => {
            if(element.returnable !== false){
                element.className === "checked" ? element.style.display = "none" : element.style.display = "flex"
            }
        });
    })

    Completed.addEventListener("click",()=>{

        div.forEach(element => {
            if(element.returnable !== false){
                element.className === "checked" ? element.style.display = "flex" : element.style.display = "none"
            }
            
        });
    })

}



Input_Text.addEventListener("keypress",(e)=>{
    e.key === "Enter" ? CreateItem() : ""  
})



const DisplayFooterText = (count)=>{
    text.innerText = `${count} Items left`
}


const Footer = (elem)=>{
    
    elem.style.display = "flex"
    

    DisplayFooterText(counter)
    
}



const DeleteItem = (btn,element)=>{
    

    btn.onclick = ()=>{
        element.style.display = "none"
        element.returnable = false
        
        element.className === "checked" ? counter -- : ""

        DisplayFooterText(counter)


        amount --
        
        amount === 0 ? footer.style.display = "none" : ""
        
        
        DeleteElements()
    
       
    }
}



let ObjectsArray = []

const AppendObject = (div)=>{
    let o = {}

    o.text = div.childNodes[1].textContent
    o.className = div.className

    ObjectsArray.push(o)
}

const Update = ()=>{
    let index;

    Current_Arr.forEach(element => {
        if(element.className === "checked"){
            index = Current_Arr.indexOf(element)
            ObjectsArray[index].className = "checked"
        }else{
            index = Current_Arr.indexOf(element)
            ObjectsArray[index].className = ""
        }
    });
}


const DeleteElements = ()=>{
    Current_Arr.forEach(element => {
        if(element.style.display === "none"){
            let index = Current_Arr.indexOf(element)
            Current_Arr.splice(index,1)
            ObjectsArray.splice(index,1)
        }
    });
}



let Current_Arr = []
const CurrenTelements = (div)=>{
    
    Current_Arr.push(div)
}





const CreateItem = ()=>{
    
    if(Input_Text.value){
        counter ++

        amount ++

        CreateDivs()

        Input_Text.value = ""

        Footer(footer)

        DeleteItem(span3,div)

        Click(div)

        FooterButtons()


        CurrenTelements(div)

        AppendObject(div)

        LocalStorage(ObjectsArray)

    }else{
        alert("Write Something!")
    }

    
    
}




//




let st_o;

const LocalStorage = (array)=>{
    st_o = JSON.stringify(array)

    localStorage.setItem("object",st_o)
    
    let footer_count = parseInt(footer.children[0].innerText)

    localStorage.setItem("FooterLength",`${footer_count}`)

}





let savedItems;

window.onload = ()=>{
    savedItems = localStorage.getItem("object")
    savedItems = JSON.parse(savedItems)

    footer_length = localStorage.getItem("FooterLength")
    

    LoadItems()

}


const MainFunctions = ()=>{
    counter ++

    amount ++

    Footer(footer)

    DeleteItem(span3,div)
    
    Click(div)
    
    FooterButtons()
    
    CurrenTelements(div)
    
    AppendObject(div)
    
    LocalStorage(ObjectsArray)
}



let clicked;
const Click = (element)=>{

    clicked = false;
    const symbol = element.childNodes[0]
    const text = element.childNodes[1]
    
    element.onclick = ()=>{
        clicked = !clicked

        if(clicked && element.className !== "checked" || !clicked && element.className !== "checked"){
            element.className = "checked" 
            symbol.style.opacity = 1
            text.style.textDecoration = "line-through"
            text.style.opacity = 0.5
            counter --

        }else if(!clicked && element.className === "checked" || clicked && element.className === "checked"){
            element.className = "" 
            symbol.style.opacity = 0
            text.style.textDecoration = "none"
            text.style.opacity = 1
            counter++
            
        }

        DisplayFooterText(counter)
        Update()
        LocalStorage(ObjectsArray)

    }
}

const Click2 = (element)=>{
    let text = element.text
    span2.innerText = text
            
    let className = element.className
    div.className = className

    if(div.className === "checked"){
        div.childNodes[0].style.opacity = 1
        div.childNodes[1].style.textDecoration = "line-through"
        div.childNodes[1].style.opacity = 0.5
        counter--
    }

   

  


    
           
  
    
}


const LoadItems = ()=>{
    try{
        savedItems.forEach(element => {
            CreateDivs();
            
            Click2(element)

            MainFunctions()
    
        });

       

    }catch(err){
        console.log("err")
    }
}


const CreateDivs = ()=>{
    Main_Div = document.querySelector(".input_items")
    div = document.createElement("div")
    div.id = "appendElement"
        
    span1 = document.createElement("span")
    span1.className = "symbol"
    span1.innerHTML = "&#10004;"

    span2 = document.createElement("span")
    span2.className = "item"
    span2.textContent = Input_Text.value

    span3 = document.createElement("span")
    span3.className = "delete"
    span3.innerHTML = `<abbr title = 'delete item'><i class="fas fa-trash-alt"></i></abbr>`
    
    div.append(span1,span2,span3)
    Main_Div.append(div)

}