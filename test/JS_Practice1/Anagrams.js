

function checkAnagram(str1,str2){
    /*sort , lowercase and remove special chars */
    
    sortedStr1 = cleanAndSort(str1)
    sortedStr2 = cleanAndSort(str2)

    if (sortedStr1==sortedStr2) {
        str1  = str1.replace(' ','').toLowerCase()
        str2  = str2.replace(' ','').toLowerCase()
        return console.log(`${str1} is an anagram of ${str2}`);   
    }else{      
     return console.log(`${str1.replace(' ','').toLowerCase()} and ${str2.replace(' ','').toLowerCase()} are not an anagram `);   
    }
}

let cleanAndSort = (str)=>{
    return str
    .replace(/[^a-zA-z0-9]/gi,'')
    .toLowerCase()
    .split('')
    .sort()
    .join('')
}

let str1 = "List en"
let str2 = "Sil ent"
checkAnagram(str1,str2)