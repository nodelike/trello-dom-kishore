export function handleTheme(){
    try {
        let themeIcon = document.querySelector('#toggle-theme > i');
        let themeName = document.querySelector('#toggle-theme > div');
        document.documentElement.classList.toggle('dark');

        if(document.documentElement.classList.contains('dark')){
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
            themeName.innerText = "Light Mode"
        } else {
            themeIcon.classList.remove('fa-sun');
            themeIcon.classList.add('fa-moon');
            themeName.innerText = "Dark Mode"
        }
    } catch (error) {
        showToast.error(error.message);
    }
}

export function toggleLoader(state){
    try {
        let loader = document.getElementById("loader");
        if(state == "show"){
            loader.classList.remove("hidden");
        } else {
            loader.classList.add("hidden");
        }
    } catch (error) {
        showToast.error(error.message);
    }
}

export const showToast = (() => {
    let toastDiv = document.createElement('div');
    toastDiv.setAttribute('class', 'hidden flex items-center gap-2 rounded-sm absolute bottom-5 right-5 w-18 py-4 px-6 text-white')
    
    let icon = document.createElement('i');
    icon.setAttribute('class', 'fa-solid fa-circle-info')
    
    let messageDiv = document.createElement('div');

    toastDiv.appendChild(icon);
    toastDiv.appendChild(messageDiv);
    document.body.appendChild(toastDiv);

    return {
        success(message){
            toastDiv.classList.remove('hidden');
            toastDiv.classList.add('bg-green-500');
            messageDiv.innerText = message;
            setTimeout(() => {
                document.body.removeChild(toastDiv);
                toastDiv.classList.add('hidden');
                toastDiv = null;
            }, 2000)
        },
        error(message){
            toastDiv.classList.remove('hidden');
            toastDiv.classList.add('bg-red-500')
            messageDiv.innerText = message;
            setTimeout(() => {
                document.body.removeChild(toastDiv);
                toastDiv = null;
                toastDiv.classList.add('hidden');
            }, 2000)
        }
    }
})();