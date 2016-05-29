class Serializable {
    fillFromJSON(jsonObject: any) {
        //var jsonObj : any = JSON.parse(json);
        for (var propName in jsonObject) {
            this[propName]  = jsonObject[propName];
        }
    }
}