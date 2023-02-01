var co, naCo, coCode, naCoCode;

function main()
{
    var waluty = ["PLN", "EUR", "USD", "GBP", "RUB", "JPY", "CZK"];
    var htmlSelect = "";
    waluty.forEach(item =>
    {
        htmlSelect += "<option value=\"" + item + "\">" + item + "</option>";
    });
    przelicznik.co.innerHTML = htmlSelect;
    przelicznik.naCo.innerHTML = htmlSelect;
}

function przelicz()
{
    try
    {
        if (coCode != przelicznik.co.value)
        {
            co = setValue(przelicznik.co.value);
            coCode = przelicznik.co.value;
        }
        if (naCoCode != przelicznik.naCo.value)
        {
            naCo = setValue(przelicznik.naCo.value);
            naCoCode = przelicznik.naCo.value;
        }
        przelicznik.wynik.value = (przelicznik.ile.value*co/naCo).toFixed(2);
    }
    catch(e)
    {
        alert("Wystąpił błąd.\nSprawdź połączenie z internetem.\n\n" + e);
        console.error(e);
        przelicznik.wynik.value = 0;
    }
}

function setValue(waluta)
{
    if(waluta == "PLN")
    {
        return 1;
    }
    var req = new XMLHttpRequest();
    req.open("GET", "http://api.nbp.pl/api/exchangerates/rates/a/" + waluta, false);
    req.send();
    return JSON.parse(req.responseText).rates[0].mid;
}