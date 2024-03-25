    function jugarAdivinarNúmero() {

    const numeroAleatorio= Math.floor(Math.random() * 100) +1;
    console.log(numeroAleatorio)

    let intentosTotales = 0;
    let adivinado = false;

    while (!adivinado){
        let intento = parseInt(prompt ("Intentá adivinar un número entre 1 y 100. Tienes 5 intentos:"));
        intentosTotales++;
        
        if (intento === numeroAleatorio) {
            alert("Felicidades! El número aleatorio era " +numeroAleatorio +". Lo adivinaste en " +
            intentosTotales + "Intentos.");
            adivinado = true;
            jugarAdivinarNúmero();
        } else if (intento < numeroAleatorio) {
            alert("El número es más alto. Intente nuevamente.");
        } else  {
            alert("El número es más bajo. Intente nuevamente.");
    }
    if (intentosTotales === 5) {
        adivinado= true;
        alert("¡Perdiste! Llegaste al maximo de intentos, vuelve a empezar.");
        jugarAdivinarNúmero();
    }
    }
    //Number respeta el número en su totalidad, en cambio parseint lo redondea
}
jugarAdivinarNúmero();