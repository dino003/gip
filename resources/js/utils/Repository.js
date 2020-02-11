
 export const formatageSomme = (montant)  => {
      var mont = parseFloat(montant)
    var p = mont.toFixed(2).split(".");
    return p[0].split("").reverse().reduce( (acc, mont, i) => {
        return  mont == "-" ? acc : mont + (i && !(i % 3) ? "." : "") + acc;
    }, "")  + " F CFA";
}

export const formatageNombre = (nombre)  => {

   nombre = parseFloat(nombre) || 0
  var p = nombre.toFixed(2).split(".");
  return p[0].split("").reverse().reduce( (acc, nombre, i) => {
      return  nombre == "-" ? acc : nombre + (i && !(i % 3) ? "." : "") + acc;
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
    return tableau.reduce( (prec, curr) =>  parseFloat(prec) + parseFloat(curr.kilometres_parcourus || 0), 0)
  }



 export const calculSommeColonneSommeIntervention = (tableau) => {
  return tableau.reduce( (prec, curr) =>  parseFloat(prec) + parseFloat(curr.cout_ttc_intervention || 0), 0)
}

export const calculSommeColonneSommeAmende = (tableau) => {
  return tableau.reduce( (prec, curr) =>  parseFloat(prec) + parseFloat(curr.montant_amende || 0), 0)
}

export const calculSommeColonneSommeConso = (tableau) => {
    return tableau.reduce( (prec, curr) =>  parseFloat(prec) + parseFloat(curr.montant_ttc || 0), 0)
  }

  var dateWithouthSecond = new Date();

  export const heure = dateWithouthSecond.toLocaleTimeString(navigator.language, {hour: '2-digit', minute:'2-digit'});

  export const colourStyles =  {
    control: styles => ({ ...styles, backgroundColor: '#F4FEFE' }),
    option: (styles, { data, isDisabled, isFocused, isSelected }) => {
      //const color = chroma(data.color);
      return {
        ...styles,


      }
    },

  }


