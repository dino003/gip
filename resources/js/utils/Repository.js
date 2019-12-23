 export const formatageSomme = (montant)  => {
    var p = montant.toFixed(2).split(".");
    return p[0].split("").reverse().reduce( (acc, montant, i) => {
        return  montant == "-" ? acc : montant + (i && !(i % 3) ? "." : "") + acc;
    }, "")  + " F CFA";
}

export const formatageNombre = (nombre)  => {
  var format = nombre ? nombre : 0
  var p = format.toFixed(2).split(".");
  return p[0].split("").reverse().reduce( (acc, format, i) => {
      return  format == "-" ? acc : format + (i && !(i % 3) ? "." : "") + acc;
  }, "") ;
}

export const groupBy = (objectArray, ...properties) => {
    return [...Object.values(objectArray.reduce((accumulator, object) => {
      const key = JSON.stringify(properties.map((x) => object[x] || null));
  
      if (!accumulator[key]) {
        accumulator[key] = [];
      }
      accumulator[key].push(object);
      return accumulator;
    }, {}))];
  }

  export const calculSommeColonne = (tableau) => {
    return tableau.reduce( (prec, curr) =>  parseFloat(prec) + parseFloat(curr.kilometres_parcourus), 0)
  }
  var dateWithouthSecond = new Date();

  export const heure = dateWithouthSecond.toLocaleTimeString(navigator.language, {hour: '2-digit', minute:'2-digit'});
       
  export const colourStyles =  {
    control: styles => ({ ...styles, backgroundColor: '#FEBFD2' }),
    option: (styles, { data, isDisabled, isFocused, isSelected }) => {
      //const color = chroma(data.color);
      return {
        ...styles,
      
        
      }
    },
  
  } 
  

