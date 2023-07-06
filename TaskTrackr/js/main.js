window.addEventListener('load',()=>{
    const form = document.querySelector("#new-task-form");
    const input = document.querySelector("#new-task-input");
    const list_el = document.querySelector("#tasks");

    // console.log(form);

    function keyoftask(v){
        for(let i = 0;i<localStorage.length;i++){
            let key = localStorage.key(i);
            if(localStorage.getItem(key) === v){
                return key;
            }
        }
    }

    function maxi(){
        if(localStorage.length == 0){
            return 0;
        }
        let m = -1;
        for(let i = 0;i<localStorage.length;i++){
            let key = localStorage.key(i);
            // let v = localStorage.getItem(key);
            if(m<Number(key)){
                m = Number(key);
            }
        }
        m = m+1;
        return m;
    }

    function showing_task(t){

        const task_el = document.createElement("div");
        task_el.classList.add("task");

        const task_content_el = document.createElement("div");
        task_content_el.classList.add("content");


        task_el.appendChild(task_content_el);

        const task_input_el = document.createElement("input");
        task_input_el.classList.add("text");
        task_input_el.type = "text";
        task_input_el.value = t;
        task_input_el.setAttribute("readonly","readonly");

        task_content_el.appendChild(task_input_el);

        const task_action_el = document.createElement("div");
        task_action_el.classList.add("action");

        const task_edit_el = document.createElement("button");
        task_edit_el.classList.add("edit");
        task_edit_el.innerHTML = "Edit";

        const task_delete_el = document.createElement("button");
        task_delete_el.classList.add("delete");
        task_delete_el.innerHTML = "Delete";

        task_action_el.appendChild(task_edit_el);
        task_action_el.appendChild(task_delete_el);

        task_el.appendChild(task_action_el);

        list_el.appendChild(task_el);

        input.value = "";

        let ind ;
        task_edit_el.addEventListener('click',()=>{
            // console.log(task_input_el.value);
            if(task_edit_el.innerText.toLowerCase() == "edit"){
                ind = keyoftask(task_input_el.value);
                task_input_el.removeAttribute("readonly");
                task_input_el.focus();
                task_edit_el.innerText = "Save";
            }else{
                localStorage.setItem(ind,task_input_el.value);
                task_input_el.setAttribute("readonly","readonly");
                if(task_input_el.value == ""){
                    del();
                    localStorage.removeItem(ind);
                }
                task_edit_el.innerText = "Edit";
            }

        });

        function del(){
            list_el.removeChild(task_el);
        };


        task_delete_el.addEventListener('click', ()=>{
            ind = keyoftask(task_input_el.value);
            list_el.removeChild(task_el);
            localStorage.removeItem(ind);
        });

    }


    function getting_stored_value_back(){
        for(let i = 0;i<localStorage.length;i++){

            let key = localStorage.key(i);
            showing_task(localStorage.getItem(key));

        }
    }

    getting_stored_value_back();

    form.addEventListener('submit',(e)=>{
        e.preventDefault();

        

        const task = input.value;

        if(task){

            showing_task(task);

            localStorage.setItem(maxi(),task);

        }

    });

});