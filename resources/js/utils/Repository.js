 export const formatageSomme = (montant)  => {
    var p = montant.toFixed(2).split(".");
    return p[0].split("").reverse().reduce( (acc, montant, i) => {
        return  montant == "-" ? acc : montant + (i && !(i % 3) ? "." : "") + acc;
    }, "")  + " F CFA";
}