class ResultsHandler {
    static x = 0;
    static y = 0;

    static size = 30;

    static get_pos_from_url(){
        
        let urls = window.location.search;
        urls = urls.replace("?", "");
        urls = urls.split("&");

        console.log(urls);

        let dict = {};

        for(let url of urls){
            let split = url.split("=");
            dict[split[0]] = split[1];
        }

        ResultsHandler.x = Number(dict["x"]) ?? 0;
        ResultsHandler.y = Number(dict["y"]) ?? 0;
    }

    static set_marker(){
        let compass = document.querySelector("#compass");
        let crect = compass.getBoundingClientRect();

        let height = crect.height;
        let width = crect.width;

        let marker = document.querySelector("#marker");

        let size = ResultsHandler.size;

        let top = crect.top + document.querySelector("html").scrollTop;
        let left = crect.left + document.querySelector("html").scrollLeft;

        marker.style.top = `${top + (height/2) + ((height/2) * -ResultsHandler.y) - size/2}px`;
        marker.style.left = `${left + (width/2) + ((width/2) * ResultsHandler.x) - size/2}px`;

    }

    static get_per(n){
        return Math.floor(Math.abs(n)*100);
    }

    static set_text(){
        let xt = (ResultsHandler.x > 0) ? "amor vetitum" : "amor hortator";
        let yt = (ResultsHandler.y > 0) ? "summa" : "indifferentem";
        document.querySelector("#res_text").innerHTML = `You are ${ResultsHandler.get_per(ResultsHandler.x)}% ${xt} and ${ResultsHandler.get_per(ResultsHandler.y)}% ${yt}`;
    }

}

window.addEventListener("load",(e)=>{
    ResultsHandler.get_pos_from_url();
    ResultsHandler.set_text();
    ResultsHandler.set_marker();
    window.addEventListener("resize", ResultsHandler.set_marker);
    window.addEventListener("scroll", (e)=>{
        ResultsHandler.set_marker();
    });
});