class HtmlHelper{
    public static removeClass(htmlElement : HTMLElement, className : string){
        htmlElement.className = htmlElement.className.replace(new RegExp('(?:^|\\s)'+className+'(?!\\S)'),'')
    }

    public static hasClass(element : HTMLElement, selector : string ){
        let className = " " + selector + " ";
        return( (" " + element.className + " ").replace(/[\n\t]/g, " ").indexOf(className) > -1 )
    }

    public static addClass(element : HTMLElement, classToAdd : string ) {
        element.className = element.className +" "+ classToAdd
    }
}