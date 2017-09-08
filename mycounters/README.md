# React és Redux a gyakorlatban

## A feladatok követéséhez szükséges szoftverek

- Telepítsük a node.js-t, és a Yarn-t is
    - A Yarn egy opcionális csomagkezelő node.js-hez, az NPM alternatívája. A React nélküle is működik, de érdemes ezzel használni.
- Telepítsük a `create-react-app` command line eszközt: `npm install -g create-react-app`
- Tetszőleges kódszerkesztő és böngésző használható, de Visual Studio Code és Chrome javasolt. Chrome-hoz érdemes telepíteni az alábbi kiegészítőket:
    - React Developer Tools: [https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi)
    - Redux DevTools: [https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd)

* * *

## 01 Kezdetek

Először is hozzuk létre a projektet. Erre a legkényelmesebb megoldás a `create-react-app` command line eszköz, ami minden függőséget beállít nekünk, így a mi saját `package.json` fájlunk viszonylag egyszerű marad majd.

Tetszőleges mappában írjuk be parancssorba:

`create-react-app mycounters`

Ez létrehoz egy mycounters mappát, benne a projekttel. Ellenőrizzük le, hogy működik-e:

```
cd mycounters
yarn start
```

Nyissuk meg Visual Studio Code-dal a mycounters mappát, és szerkesszünk bele az App.js-be – pl. a "Welcome to React" szöveget írjuk át "Welcome to React!!!"-re. A böngészőben egyből látszania kell az eredménynek.

Az app.js egy nagyon egyszerű felületet renderel definiál: egy komponensünk van, az App, ami HTML-szerű komponenseket jelenít meg. Figyeljük meg, hogy JSX-ben `class` helyett `className`-et írunk, illetve az `img` tag `src` attribútumának nem statikus stringet adunk át, hanem egy `logo` objektumot, amit a fájl elején importálunk. Ez WebPack sajátosság, lehetővé teszi, hogy a statikus asseteket is ugyanazzal a metódussal tudjuk kezelni pl. dependencia menedzsment szempontjából, mint a kódmodulokat. Ugyanígy az `app.css`-z is `import` utasítással jelenítjük meg az oldalon.

Hozzunk létre egy új fájlt, `Counter.js` néven (nagy kezdőbetűvel!), az alábbi tartalommal:

```JavaScript

import React from 'react' 
import { render } from 'react-dom' 
 
class Counter extends React.Component { 
    constructor(props, context) { 
        super(props, context) 
        this.increment = this.increment.bind(this) //developer.mozilla.org/en/docs/Web/JavaScript/Reference/Functions/Arrow_functions#No_binding_of_this 
 
        this.state = { 
            count: this.props.initialCount 
        } 
    } 
 
    increment() { 
        this.setState( 
            { 
                ...this.state, //bár a state-ben most nincs más mező, így gondoskodunk róla, hogy a jövőben se írjuk felül őket, ha lesznek
                count: this.state.count + 1 
            } 
        ) 
    } 
 
    render() { 
        return <div> 
            <h2>{ this.props.name }</h2> 
 
            <p>Current count: <strong>{ this.state.count }</strong></p> 
 
            <button onClick={this.increment}>Increment</button> 
        </div>; 
    } 
} 
 
export default Counter

```

_Előadáson már szerepeltek ezek a konstrukciók, a spread operátort (`...state`) kivéve: ez az előző state objektum összes kulcs-érték párját bemásolja az új objektumba. Mivel Reactben a State-et mindig **cseréljük**, sosem módosítjuk, ezért gyakori minta, hogy egy új objektumba először belemásoljuk a régi State-et, és utána írjuk bele az újnak szánt értékeket._

A Counter komponensünket az index.js-ben használjuk:

```JavaScript

import React from 'react' 
import { render } from 'react-dom' 
import Counter from './Counter' 
 
render(<div><h1>MyCounters</h1><Counter name="Warrior level" initialCount={1} /></div>, document.getElementById('root'))

```

Az App.* fájlokra és a logo.svg-re a továbbiakban nincs szükségünk, törölhetjük őket.

Ha mindezt elmentjük, meg fog jelenni egy Warrior level nevű számláló, ami 1-ről indul, és az Increment gombbal növelhetjük az értékét.

* * *

## 02 Dizájn

Az index.css-be vegyünk fel pár alap stílust (felülírva az eddigi tartalmat):

```CSS

@import url('https://fonts.googleapis.com/css?family=Roboto'); 
 
body { 
    background: #239EE7; 
    color: white; 
    font-family: 'Roboto', sans-serif; 
} 
 
button { 
    background-color: white; 
    color: #239EE7; 
    border: 0 none; 
    border-radius: 4px; 
    padding: 10px; 
    font-size: 0.9em; 
    text-transform: uppercase; 
} 

```

Importáljuk be az index.js-ben:

`import './index.css'`

Hozzunk létre saját stíluslapot a Counter komponensünknek is. (Counter.css)
Ebben a fájlban minden selector nevét a komponens nevével kezdjük (`.Counter`)

```CSS

.Counter {
    border: 2px solid white;
    border-radius: 3px;
    padding: 20px;
    margin-right: 30px;
    margin-top: 30px;
    display: inline-block;
}

.Counter h2 {
    margin-top: 0;
}

.Counter .current-count {
    float: right;
    font-size: 30px;
}

.Counter button:not(:last-of-type) {
    margin-right: 10px;
}

```

Ne felejtsük el a `Counter.js`-ben be is importálni:

`import './Counter.css'`

A `render` függvényben pedig hivatkozni kell a használt selectorokra:

```
return <div className="Counter"> 
    <span className="current-count">{ this.state.count }</span> 

    <h2>{ this.props.name }</h2> 

    <button onClick={this.increment}>Increment</button> 
</div>

```

Tegyünk ikont is a gombra. Ehhez használhatjuk például a `react-icons` csomagot. CTRL+C-vel állítsuk le a futást, és írjuk be:

`yarn add react-icons --save`

Hogy konkrétan milyen ikont szeretnénk használni, azt a [projekt oldalán](https://gorangajic.github.io/react-icons/) böngészhetjük ki. Pl. írjuk át a gombot így:

`<button onClick={this.increment}><FaPlusCircle /> Increment</button>`

Ehhez persze importálni kell a `FaPlusCircle` komponenst a fájl elején:

`import FaPlusCircle from 'react-icons/lib/fa/plus-circle'`

Próbáljuk ki `yarn start`-tal. Ha működik, csináljunk "decrement" gombot is.

- Import: `import FaMinusCircle from 'react-icons/lib/fa/minus-circle'`  (az plus-circle alá)
- Konstruktor: `this.decrement = this.decrement.bind(this)` (a this.increment... alá)
- Render: `<button onClick={this.decrement}><FaMinusCircle /> Decrement</button>`  (az increment gomb alá)

És persze kell az osztályba egy decrement függvény is:

```JavaScript

decrement() { 
    this.setState(  
        { 
            ...this.state, 
            count: this.state.count - 1 
        } 
    ) 
} 
```

* * *

## 03 Saját számlálók

Hozzunk létre egy új komponenst (CounterCollection.js).

```JavaScript

import React from 'react' 
import { render } from 'react-dom' 
import Counter from './Counter' 
import FaPlusCircle from 'react-icons/lib/fa/plus-circle'
import './CounterCollection.css';
 
class CounterCollection extends React.Component { 
    constructor(props, context) { 
        super(props, context)
        this.addCounter = this.addCounter.bind(this)
    }

    addCounter() {
    }

    render() {
        return <div className="CounterCollection"> 
            TODO: számlálók megjelenítése
            <a className="add-counter-button" onClick={this.addCounter}><FaPlusCircle /></a> 
        </div>; 
    }
}

export default CounterCollection  

```

Hozzá a CSS (CounterCollection.css):

```CSS

.CounterCollection .add-counter-button {
    font-size: 5em;
}
```

Ez számlálókat fog tárolni, a következő struktúra szerint:

```JavaScript

this.state = { 
    counters: [ 
        { 
            name: "Wizard level", 
            initialCount: 3 
        }, 
        { 
            name: "Bard level", 
            initialCount: 2 
        } 
    ] 
}
```

Ezt be is írhatjuk a konstruktorba.

Ezek minden példányához egy Counter komponenst fogunk megjeleníteni, az alábbi segédfüggvényre építve:

```JavaScript

renderSingleCounter(counter) { 
    return <Counter name={counter.name} initialCount={counter.initialCount} key={counter.name} /> 
}
```

- Nem csak a `render` függvény adhat vissza JSX komponenst!
- Figyeljünk arra, hogy ne tegyünk idézőjelet az attribútum értékadásokhoz.
- Key attribútuma ugyan nincs a Counternek, de a Reactnek szüksége van rá ahhoz, hogy listában tudja kezelni a Counter példányokat. Ennek egyedinek kell lennie – nálunk a név az lesz.

A `render` függvényben ezt a segédfüggvényt közvetlenül felhasználhatjuk. Az előadáson már megismert `map` függvény segítségével a `state`-ben található összes számlálóhoz létrehozunk egy countert:

```JavaScript

render() {
    return <div className="CounterCollection"> 
        { this.state.counters.map(this.renderSingleCounter) } 
        <a className="add-counter-button" onClick={this.addCounter}><FaPlusCircle /></a> 
    </div>; 
}
```

Végül írjuk meg az `addCounter` függvényt:

```JavaScript

addCounter() { 
    let name = prompt("Name for the new counter"); 
    if (!name) { 
        return; 
    } 
    if (this.state.counters.some( c => c.name === name)) { 
        alert("You already have a counter named " + name); 
        return; 
    } 
    this.setState( 
        { 
            ...this.state, 
            counters: [ 
                ...this.state.counters, 
                { 
                    name, 
                    initialCount: 0 
                } 
            ]    
        } 
    ); 
}

```

Természetesen a tömböket sem módosítjuk soha, hanem mindig másoljuk. Tömbökre is működik a spread operátor.

Az index.js-ben a Counter-t már ne importáljuk, helyette a CounterCollectiont:

`import CounterCollection from './counter-collection'`

A render pedig:

`render(<div><h1>MyCounters</h1><CounterCollection /></div>, document.getElementById('root'))`

Próbáljuk ki! Alapból két számláló kell megjelenjen, és a nagy + gombbal továbbiakat kell tudjunk hozzáadni.

* * *

## 04 Saját események

Tegyük lehetővé számlálók törlését. Ez egy érdekes feladat, hiszen a számlálók listája a CounterCollectionben van, ugyanakkor a törlés gombot nyilván a Counteren szeretnénk megjeleníteni. Megoldás: a Counteren elhelyezett törlés gomb egy eseményt süt el, amire a CounterCollection feliratkozik.

Először módosítsuk a Counter.js-t:

- Import: `import FaTrash from 'react-icons/lib/fa/trash'`
- Konstruktor: `this.remove = this.remove.bind(this)`
- Render: `<button onClick={this.remove}><FaTrash /></button>` (tegyük a Decrement gomb alá)

Maga a `remove` függvény pedig:

```JavaScript

remove() { 
    this.props.onRemove(this.props.name) 
}
```

Tehát az esemény nem más, mint egy függvény hivatkozás, ami a Propson helyezhető el. A CounterColletcionben így tudunk rá "feliratkozni":

```JavaScript

renderSingleCounter(counter) { 
    return <Counter name={counter.name} initialCount={counter.initialCount} key={counter.name} onRemove={this.removeCounter} />
}

```

A removeCounter függvény:

```JavaScript

removeCounter(name) { 
    this.setState( 
        { 
            ...this.state, 
            counters: this.state.counters.filter(n => n.name !== name) 
        } 
    ) 
} 
```

Tehát az új `counters` tömmbe az összes számlálót átmásoljuk, amelyiknek a neve _nem_ egyezik meg a törlendőével.

Mivel a removeCounter, és mostmár a renderSingleCounter is, használja a `this` hivatkozást, őket is bindolni kell a konstruktorban:

```JavaScript

this.removeCounter = this.removeCounter.bind(this)
this.renderSingleCounter = this.renderSingleCounter.bind(this) 
```

Ezzel kész is vagyunk a törléssel.

* * *

## 05 Redux alapok

Jelenleg az alkalmazásunk állapota (vagyis, hogy melyik számlálónak mi az *aktuális értéke*) szanaszét van a komponens fában – minden Counter külön-külön, magának tárolja. Ha szeretnénk pl. perzisztenciát bevezetni az alkalmazásba, látszik, hogy már most kihívásokkal kell szembenézzünk – pedig jelen formájában az alkalmazás azért elég egyszerű.

A Redux az előadáson már megismert Flux tervezési minta egy speciális formája, egyben egy segédkönyvtár Reacthez. Fontos azonban látni, hogy az alap Redux koncepciók Reacttól függetlenül is működnek, sőt, a segédkönyvtárra sincs feltétlen szükségünk az alkalmazásához. A Redux abban is segít, hogy az alkalmazás működését – műveleteket, adatáramlást, mindenkori állapotot – felülettől, sőt, technológiától függetlenül végiggondolhassuk, sőt, implementálhassuk – ami később a teszteléskor is nagy segítség lesz.

A legfontosabb alapfogalmak a következők:

- **Store:** "az igazság egyetlen forrása" – egy JavaScript objektum, ami az alkalmazás teljes állapotát tartalmazza. Ez elsőre furcsa megközelítésnek tűnhet pl. modularitás szempontjából, ám itt teljes objektum hierarchiára kell gondolni – a Store objektum valójában tipikusan más objektumfákat tartalmaz, amelyek megfeleltethetőek 1-1 modul állapotának. A modulok tehát egymástól függetlenül kezelhetik a saját állapotukat, de mind ugyanott tárolják azt. Ha jól tervezzük meg a Store-t, nem lesznek ütközések, és nem kívánt függőségek
- **Action:** Egy művelet, ami az állapot módosulásával jár. A Store-ban tárolt állapot mindig csak egy Action hatására módosulhat (pontosabban nem módosul, hanem _lecserélődik_, ahogy azt a Reactes `setState`-nél is megszoktuk) – így az alkalmazásban zajló, állapotváltással járó folyamatok mindig explicitek, jól nyomonkövethetőek, és könnyen visszajátszhatóak pl. teszteléskor.
- **Reducer:** Egy tiszta függvény (pure function), ami egy State objektum és egy Action kombinációjából egy új State-et állít elő, ami annak az állapotnak felel meg, amire az eredeti állapotnak módosulnia kell az Action hatására. Pl. egy INCREMENT_COUNTER action hatására egy olyan állapotot kell visszaadnia, ami megegyezik az előző állapottal, leszámítva, hogy az egyik számláló értéke eggyel nagyobb. Mivel tiszta függvény (tehát nincs mellékhatása, és azonos paraméterek mindig azonos eredménnyel járnak, tehát nem használnak pl. időt, API hívást, és más, változékony / "rejtett" bemenetet), ezért mockolás nélkül is jól tesztelhető.
- **Dispatcher:** Az alkalmazás egyes komponensei, valahányszor az állapot módosulását szeretnék elérni, a Dispatchernek küldik el a megfelelő Actiont. A Dispatcher pedig a jelenlegi állapottal, és a választott Actionnel lefuttatja a regisztrált Reducer-eket (egymás után), így előáll az új állapot. React esetében ilyenkor a felület automatikusan frissül, hogy már az új állapotot reprezentálja.
- **Middleware:** Az Action és az aktuális állapot ismeretében, a Reducerek futása előtt vagy után, extra kód futtatása. Pl. minden művelet és állapotváltozás naplózása middleware-rel valósítható meg.

Ez így elsőre minden bizonnyal nagyon töménynek hangzik, úgyhogy vágjunk is bele egy konkrét példába.

Hozzunk létre egy új fájlt, constants.js néven, és definiáljuk benne az alkalmazásunk egyes műveleteit.

```JavaScript

const constants = { 
    INCREASE_COUNTER: "INCREASE_COUNTER", 
    DECREASE_COUNTER: "DECREASE_COUNTER", 
    ADD_COUNTER: "ADD_COUNTER", 
    REMOVE_COUNTER: "REMOVE_COUNTER" 
} 
 
export default constants
```

Ezután hozzunk létre egy JSOn fájlt (initialState.json), és ebben vázoljuk fel, hogyan fog kinézni az alkalmazás mindenkori állapota. Ez hasonlítani fog ahhoz, amit a CounterCollection tárol, ám itt nem a kezdeti, hanem az aktuális értékei lesznek a számlálóknak!

```JavaScript

{ 
    "counters": 
    [ 
        { 
            "name": "Wizard level", 
            "count": 3 
        }, 
        { 
            "name": "Bard level", 
            "count": 2 
        } 
    ] 
}
```

Mit is várunk egy-egy Actiontől? Önmagában semmit – csak azt, hogy legyen (legalább) egy Reducer, ami képes értelmezni, és a megfelelő változást előidézni az állapotban.

Hozzunk létre egy új fájlt egy új mappában (store/reducers.js):

```JavaScript

import C from '../constants' 
 
export const counter = function (state, action) { 
    if (action.type === C.INCREASE_COUNTER) { 
        return { 
            ...state, 
            counters: state.counters.map( 
                ctr => ctr.name === action.name 
                ? {...ctr, count: ctr.count + 1 } 
                : ctr 
            ) 
        } 
    } 
    else if (action.type === C.DECREASE_COUNTER) { 
        //Ugyanaz, mint az előző, csak + helyett -
        return { 
            ...state, 
            counters: state.counters.map( 
                ctr => ctr.name === action.name 
                ? {...ctr, count: ctr.count - 1 } 
                : ctr 
            ) 
        } 
    } 
    else { 
        return state; 
    } 
}
```

Mit látunk?

- Az Action bármi lehet, de ez a Reducer csak kétfélét tud kezelni. Bármilyen más Action érkezése esetén visszaküldi az eredeti állapotot változatlanul
- A State objektum minden elemét változatlanul hagyja, kivéve a "counters" tömböt: ezen lefuttatja a `map` függvényt
- A `map` függvénynek átadott transzformáció a következő: ha az aktuális elem neve NEM egyezik meg az Action által hivatkozott elem nevével, változás nélkül átmásolódik az új tömbbe. Ha megegyezik, létrehozunk egy új objektumot, ami mindenben megegyezik az elem eredeti állapotával (`...ctr`), kivéve a `count` mezőjét, mert az eggyel nagyobb / kisebb lesz, mint volt

Elsőre tehát bonyolultnak tűnik a kód, főleg a State módosíthatatlansága miatt, de igazából egyszerű dolgokat csinál (sokat segat a `map` és a spread operátor).

Próbáljuk ki az index.js-ben. Egyelőre kommentezzünk ki mindent, ami eddig ott volt, és írjuk be:

```JavaScript

import C from './constants' 
import initialState from './initialState.json' 
import { counter } from './store/reducers' 
 
const state = initialState 
 
const action = { 
    type: C.INCREASE_COUNTER, 
    name: "Bard level" 
} 
 
const nextState = counter(state, action);
 
console.log(state); 
console.log(nextState); 
```

Konstruálunk tehát egy Actiont, és átadjuk a counter Reducernek, a kezdeti állapottal együtt. Mivel az állapot nem módosul, ráréünk a kód végén logolni az eredeti, és az új állapotot is, ahol ellenőrizhetjük a változást. A böngészőben persze nem fog megjelenni semmi, de ha megnyitjuk a fejlesztőeszközöket (CTRL+SHIFT+I), a konzolon látni fogjuk a változást.

* * *

## 06 CounterCollection reducer

Az alkalmazásunk már képes számlálók állapotát kezelni, de a CounterCollection eddigi felelősségét még nincs, ami átvegye: semmi nem kezeli az `ADD_COUNTER` és `REMOVE_COUNTER` műveleteket.

A reducers.js-be írjuk be:

```JavaScript

export const counterCollection = function (state, action) { 
    switch(action.type) 
    { 
        case C.ADD_COUNTER: 
            return { 
                ...state, 
                counters: [ 
                    ...state.counters, 
                    action.payload             
                ] 
            } 
        case C.REMOVE_COUNTER: 
            return { 
                ...state, 
                counters: state.counters.filter(ctr => ctr.name !== action.name) 
            } 
        default: 
            return state 
    } 
}
```

Tehát szétválasztjuk a felelősségeket, nem a meglevő Reducert bővítettük, hanem újat hoztunk létre erre a feladatkörbe. Hogy kipróbáljuk, először is importáljuk az új Reducert az index.js-ben: 

`import { counter, counterCollection } from './store/reducers'`

Ha megvan, a `const nextState = counter(state, action);` sor alá írjuk be:

```JavaScript

const action2 = { 
    type: C.ADD_COUNTER, 
    payload: { 
        name: "Barbarian level", 
        count: 4 
    } 
} 
 
const nextState2 = counterCollection(nextState, action2)
 
const action3 = { 
    type: C.REMOVE_COUNTER, 
    name: "Wizard level" 
} 
 
const nextState3 = counterCollection(nextState2, action3)
```

Végül a `console.log` hívások sorát is bővítsük:

```JavaScript

console.log(nextState2)
console.log(nextState3)
```

Próbáljuk ki, végbemennek-e az elvárt állapotváltozások!

Egy apróságot "elsunnyogtunk": jelenleg semmi nem akadályozza meg két, azonos nevű számláló felvételét! 

Az index.js-ben adjuk ki ismét a második (Counter beszúró) Actiont:

`const nextState4 = counterCollection(nextState3, action2)`

Logoljuk:

`console.log(nextState4)`

Látható, hogy két "Barbarian level" számlálónk lesz, ami az alkalmazás helytelen működését eredményezheti. Módosítsuk a Reducert: ha megadott nevű számlálónk már van, ne engedjük felvenni az újat.

```JavaScript

case C.ADD_COUNTER:
    const hasThisCounter = state.counters.some( ctr => ctr.name === action.payload.name) 
    return hasThisCounter 
        ? state //don't add the counter
        : { 
            ...state, 
            counters: [ 
                ...state.counters, 
                action.payload             
            ] 
        }
```

Így futtatva a kódot az utolsó művelet már hatástalan kell legyen.

* * *

## 07 Reducer kompozíció

Az eddigiek során mindig ügyeltünk arra, hogy a megfelelő Actiont a megfelelő Reducernek adjuk át. Ideális esetben az összes Action az összes Reducerhez eljut, így kizárlóag az ő szintjükön jelenik meg annak a felelőssége, hogy melyik Actiont melyik Reducer tudja kezelni – a hívónak nem kell tudnia erről.

Sőt! Az egyes Reducerek felelőssége is nagyobb a szükségesnél: jelenleg ismerik a teljes State fát, holott elég lenne, ha az állapotnak csak az ő felelősségük szempontjából releváns része jutna el hozzájuk. Tehát a "counter" Reducerhez csak Counter objektumok, a CounterCollectionhöz pedig csak Counter lista jutna el.

Végül pedig lenne egy "app reducer", ami ezeket a reducereket úgy képes kombinálni, hogy a végén – az általuk előállított eredményekből – újra előálljon a teljes State fa.

Ennek megfelelően a reducers.js tartalmát az alábbiak szerint alakítjuk át:

```JavaScript

import C from '../constants'

export const counter = function (state = { name: "", count: 0}, action) {
    if (action.type === C.INCREASE_COUNTER) {
        return state.name === action.name
                ? {...state, count: state.count + 1 }
                : state
    }
    else if (action.type === C.DECREASE_COUNTER) {
        return state.name === action.name
                ? {...state, count: state.count - 1 }
                : state
    }
    else {
        return state;
    }
}

export const counters = function (state = [], action) {
    switch(action.type)
    {
        case C.ADD_COUNTER:
            const hasThisCounter = state.some( ctr => ctr.name === action.payload.name)
            return hasThisCounter
                ? state
                :  [
                        ...state,
                        action.payload            
                   ]
        case C.REMOVE_COUNTER:
            return state.filter(ctr => ctr.name !== action.name)

        case C.INCREASE_COUNTER:
        case C.DECREASE_COUNTER:
            return state.map(ctr => counter(ctr, action))

        default:
            return state
    }
}

export const myCountersApp = function (state = { counters: [] }, action) {
    return {
        counters: counters(state.counters, action)
    }
}
```

Mit látunk?

- Az app reducer felelőssége a teljes State fából kiszedni a "counters" listát, és a "counters" Reducerre bízni a kezelését
- A "counters" Reducer felelőssége a számlálókkal kapcsolatos műveletek kezelése, magas szinten. Az `ADD_COUNTER` és a `REMOVE_COUNTER` Actionöket úgy kezeli, ahogy eddig a CounterCollection tette (csak kicsit egyszerűbben, mivel már csak egy tömböt kezel, nem egy objektumba ágyazott tömböt), az `INCREASE_COUNTER` és `DECREASE_COUNTER` műveleteket pedig – elemenként – delegálja a counter Reducerhez, aminek logikája nagyban egyszerűsödött, hiszen már csak 1-1 counterrel kell foglalkoznia.

A használat az index.js-ben egyszerűsödik:

- Csak egy Reducert kell importálni: `import { myCountersApp } from './store/reducers'`
- Mindenhol, ahol eddig a counter és counterCollection Reducereket használtuk, használhatjuk egységesen a myCountersApp Reducert – nem a mi felelősségünk választani!

Ha ezeket a változtatásokat elvégezzük, a működés nem változik a korábbi állapothoz képest (próbáljuk ki!) – csak a kód lett rendezettebb.

Hogy jobban látszódjon a myCountersApp Reducer szerepe, vezessünk be egy új "funkciót" az alkalmazásba: mostantól lehet szűrni a számlálók listáját aszerint, hogy a rajtuk látható érték pozitív, negatív vagy nulla-e.

Bővítsük ki a constants.js-t:

```JavaScript

export const Actions = {
    INCREASE_COUNTER: "INCREASE_COUNTER",
    DECREASE_COUNTER: "DECREASE_COUNTER",
    ADD_COUNTER: "ADD_COUNTER",
    REMOVE_COUNTER: "REMOVE_COUNTER",

    SET_VISIBILITY_FILTER: 'SET_VISIBILITY_FILTER'
}

export const VisibilityFilters = {
  SHOW_ALL: 'SHOW_ALL',
  SHOW_POSITIVE: 'SHOW_POSITIVE',
  SHOW_NEGATIVE: 'SHOW_NEGATIVE',
  SHOW_ZEROS: 'SHOW_ZEROS'
}
```

initialState.json:

```JavaScript

{
    "counters":
    [
        {
            "name": "Wizard level",
            "count": 3
        },
        {
            "name": "Bard level",
            "count": 2
        }
    ],

    "visibilityFilter": "SHOW_ALL"
}
```

Jöhet a hozzá tartozó Reducer. A reducers.js-ben módosítsuk az importot:

`import { Actions as C, VisibilityFilters} from '../constants'`

Majd vegyünk fel egy új Reducert:

```JavaScript

export const visibilityFilter = function (state = VisibilityFilters.SHOW_ALL, action) {
    switch(action.type)
    {
        case C.SET_VISIBILITY_FILTER:
            return action.filter;
        default:
            return state;
    }
}
```

Ennek a Reducernek a felelőssége tehát egyetlen VisibilityFilter érték karbantartása. Az eddigi Reducereinket az új Action type-ok és az új State mező bevezetése *nem* befolyásolja – ezért jó, hogy kompozíciót vezettünk be. Egyedül a myCountersApp Reducert kell bővíteni:

```JavaScript

export const myCountersApp = function (state = { counters: [] }, action) {
    return {
        counters: counters(state.counters, action),
        visibilityFilter: visibilityFilter(state.visibilityFilter, action)
    }
}
```

Az index.js-ben csak az importot kell módosítani:

`import {Actions as C, VisibilityFilters} from './constants'`

Ha ez megvan, írjunk tesztet az új "funkcióra":

```JavaScript

const action4 = { 
    type: C.SET_VISIBILITY_FILTER, 
    filter: VisibilityFilters.SHOW_POSITIVE
} 
 
const nextState4 = myCountersApp(nextState3, action4) 
```

(Az eddigi `const nextState4 = myCountersApp(nextState3, action2)` sort töröljük.)

Mit látunk?

- A visibilityFilter értéke végig változatlan, csak az utolsó Action hatására változik meg, a megadott értékre
- Az utolsó Action a counters listát nem befolyásolja. Logikusnak tűnhetne "kiszűrni" a negatív (és nulla) értékű számlálókat, de valójában nem volna helyes: az a UI dolga, hogy a State-et "értelmezze", és pl. ebben az esetben a számlálók egy részét ne jelenítse meg. Ráadásul, ha az állapotból is törölnénk őket, hogyan tudnánk őket "visszahozni", ha a filtert ismét `SHOW_ALL`-ra állítjuk?

* * *

## 08 Redux segédfüggvények

Az eddigiekben úgy alkalmaztuk a Redux koncepcióit, hogy magát a library-t nem is használtunk. Most telepítsük a projektünkbe. Állítsuk le a szervert (CTRL+C a parancssorban), és írjuk be:

`yarn add redux --save`
`yarn start`

Először a reducers.js-ben fogjuk használni. A fájl elején írjuk be:

`import { combineReducers } from 'redux'`

Ezután a saját myCountersApp implementációnkat cseréljük le az alábbira:

```JavaScript

const myCountersApp = combineReducers({ 
  counters, 
  visibilityFilter 
}) 
 
export default myCountersApp
```

Végül a többi Reducer definiciója elől töröljük az `export` kulcsszót.

Mire jó ez?

- "Kívülről" már csak a kombinált Reducer érhető el, ránk van bízva, milyen további Reducereket használunk, és azokat hogyan strukturáljuk. (Ez a Redux csomag nélkül is ment volna.)
- A combineReducers segédfüggvény egyszerűsíti a Reducer kompozíciót; csak arra kell figyelni, hogy a Reducerek nevei egyezzenek meg a State általuk kezelendő részfájának nevével

Az index.js-ben a Reducer import az alábbiak szerint módosul:

`import myCountersApp from './store/reducers'`

Ezután a működés meg kell egyezzen az eddig tapasztalttal.

Önmagában emiatt persze nem érné meg a Redux libraryt használni. Ennél lényegesen nagyobb segítség a Store és a hozzá tartozó Dispatcher, amit tartalmaz. (Idézzük fel ezt a két fogalmat óra elejéről, ha nem rémlene!) Ami jóval kényelmesebb lesz így, az a State mindenkori állapotának nyilvántartása – az index.js most tele van nextState2, nextState3 stb. változókkal, pedig lehetne jóval egyszerűbb is.

Módosítsuk az index.js-t az alábbiak szerint:

```JavaScript

import {Actions as C, VisibilityFilters} from './constants'
import initialState from './initialState.json'
import myCountersApp from './store/reducers'
//Új import:
import { createStore } from 'redux'

//Store létrehozása
let store = createStore(myCountersApp, initialState)

//Írjuk ki a kezdeti állapotot
console.log(store.getState())

//Iratkozzunk fel az állapotváltozásokra
//(Az összes többi console.log hívás törölhető)
//A visszakapott unsubscribe függvénnyel le is tudnánk irakozni
let unsubscribe = store.subscribe(() =>
  console.log(store.getState())
)

//Nem kellenek köztes action és nextState változók
//Közvetlenül "beküldhetjük" a Store-nak az Action-öket
store.dispatch({
    type: C.INCREASE_COUNTER,
    name: "Bard level"
})

store.dispatch({
    type: C.ADD_COUNTER,
    payload: {
        name: "Barbarian level",
        count: 4
    }
})

store.dispatch({
    type: C.REMOVE_COUNTER,
    name: "Wizard level"
})

store.dispatch({
    type: C.SET_VISIBILITY_FILTER,
    filter: VisibilityFilters.SHOW_POSITIVE
})
```

A működés azonos az eddigivel, de a kód egyszerűbb, átláthatóbb lett.

Tulajdonképpen az alkalmazás korábban meglevő funkcionalitása ezzel elkészült, csak UI nincs még hozzá – de teszteket már lehet írni, és még csak mockolni sem kell, hiszen mindent tisztán függvényekkel oldottunk meg. Persze a legtöbb alkalmazás ennél bonyolultabb (pl. most nincs API hívás a rendszerben) – nemsokára kitérünk a komplexebb helyzetek kezelésére is.

* * *

## 09 Middleware

Jelenleg az index.js-ben iratkozunk fel a Store változásaira műveletek és állapotok naplózása végett, ám ez tipikusan egy olyan funkció, amit Middleware-re bízhatnánk. Ahhoz, hogy Middleware-t írhassunk, ki kell szervezzük a Store létrehozását egy factory függvénybe. A store mappában hozzunk létre egy új fájlt, index.js néven, és írjuk bele:

```JavaScript

import myCountersApp from './reducers' 
import { createStore, applyMiddleware } from 'redux' 
 
const logMessages = store => next => action => {

    let result 
    const logState = state => console.log( 
        `filter: ${state.visibilityFilter} 
         counters: ${state.counters.reduce((str, ctr) => str + "[" + ctr.name + ": " + ctr.count + "] ", "")}` 
    ) 
 
    //Dispatch előtti állapot
    console.groupCollapsed('dispatching ' + action.type) 
    logState(store.getState()) 
     
    //Dispatch végrehajtása
    result = next(action) 
     
    //Dispatch utáni állapot
    logState(store.getState()) 
 
    console.groupEnd() 
     
    //Dispatch eredményének továbbadása
    return result 
} 
```

Az, hogy az állapotot hogyan alakítjuk stringgé a `logState` belső függvényben (az `Array.reduce` függvény segítségével), a most tárgyalt témakör szempontjából nem lényeges. Annál édekesebb a Middleware tipikus felépítése:

- Kapunk egy referenciát a Store-ra, és a végrehajtás alatt álló Action-re
- Kapunk egy referenciát a `next` függvényre, ami az Action Reducerek felé történő továbbjuttatását jelenti
- Így a `next` hívás előtt a jelenlegi, a `next` hívás után a következő állapotot tudjuk vizsgálni.
- Ha nem hívunk `next`-et / nem adjuk vissza a függvény végén annak eredményét, azzal gyakorlatilag megszakítjuk a Dispatch folyamatot.

Ami még furcsa benne, hogy a függvény nem 3 paramétert kap, hanem három 1 paraméteres, egymásba ágyazottfüggvény írunk gyakorlatilag – csak az arrow function szintaktika ezt nagyrészt elfedi előlünk. Anélkül így nézne ki a kód:

```JavaScript

const logMessages = function(store) { 
    return function(next) { 
        return function (action) { 
            ... 
        } 
    } 
}
```

Ennek a felépítésnek a szükségessége a Redux dispatcher felépítéséből adódik – bővebben nem tárgyaljuk, de a hivatalos honlapon alaposan levezetésre kerül: [http://redux.js.org/docs/advanced/Middleware.html](http://redux.js.org/docs/advanced/Middleware.html)

Most, hogy kész a Middleware, a fájl végén létre is hozhatjuk a Store-t:

```JavaScript

export default (initialState={}) => createStore(myCountersApp, initialState, applyMiddleware(logMessages))
```

Ez a modul tehát egyetlen factory függvényt exportál, ami létrehoz egy Store-t, aminek opcionálisan átadhatunk egy kezdeti állapotot is. Az `index.js`-ben először is töröljük az eddigi, "kézi" Store létrehozás sorait:

```JavaScript

import myCountersApp from './store/reducers'
import { createStore } from 'redux'

let store = createStore(myCountersApp, initialState)

console.log(store.getState())

let unsubscribe = store.subscribe(() =>
  console.log(store.getState())
)
```

A myCountersApp importját azért törölhetjük, mert mostmár a Reducerek bekötéséről is a factory gondoskodik!

A factoryt így használhatjuk:

```JavaScript

import storeFactory from './store'

let store = storeFactory(initialState)
```

A `store.dispatch` hívásokon nem kell változtatni, módosítás nélkül működnek. A konzolos kimenetünk azonban – az új Middleware-nek köszönhetően – átláthatóbb lesz, mint volt.

* * *

## 10 Action creators

Az estek többségében az, hogy állapotot akarunk váltani, valamilyen esemény hatására következik be. Pl. felhasználói interakció, API hívás válaszának megérkezése stb. Ezek ráadásul időnként meghatározott láncot alkotnak: pl. egy Action "Loading" állapotba teszi a felületet, elindul az API hívás, majd ha megjött a választ, egy másik Action leveszi a loading indikátort, és az állapotban elhelyezi az eredményt.

Hova kerüljön az ezt vezénylő kód?

A megoldás ún. "Action creatorok" létrehozása, amelyek nem pusztán factory metódusok Action objektumok összeállítására, hanem az előző példában említett folyamatokat is tartalmazzák. Ezek gyakorlatilag azok a műveletek, amik más keretrendszernél egy Controllerben vagy egy ViewModelben megjelennének.

Először is "refaktoráljuk" kicsit a kódot.

1. Hozzunk létre két új mappár: "actions" és "reducers".
1. A constants.js helye mostantól actions/constants.js
1. A reducers.js "megszűnik", pontosabban 3 új fájlba feldaraboljuk:

**reducers/counters.js**

```JavaScript

import { Actions as C } from '../actions/constants'

const counter = ...

const counters = ...

export default counters
```

**reducers/visibilityFilter.js**

```JavaScript

import { Actions as C, VisibilityFilters} from '../actions/constants'

const visibilityFilter = ...

export default visibilityFilter
```

**reducers/index.js**

```JavaScript

import counters from './counters'
import visibilityFilter from './visibilityFilter'
import { combineReducers } from 'redux'

const myCountersApp = combineReducers({
  counters,
  visibilityFilter
})

export default myCountersApp
```

Az átrendezés miatt néhány importot frissítenünk kell:

- store/index.js: `import myCountersApp from '../reducers'`
- index.js: `import {Actions as C, VisibilityFilters} from './actions/constants'`

Próbáljuk ki, hogy minden változatlanul működik-e!

Jöhetnek az Action creatorok! Ezek elsőre csak egyszerű factory metódusok lesznek, de később bővítjük, amelyiket kell. Írjuk egy új fájlba (actions/index.js):

```JavaScript

import { Actions as C } from '../actions/constants' 
 
export const addCounter = (name, count) => { 
    return { 
        type: C.ADD_COUNTER, 
        payload: { name, count } 
    } 
} 
 
export const removeCounter = name => { 
    return { 
        type: C.REMOVE_COUNTER, 
        name: name 
    } 
} 
 
export const increaseCounter = name => { 
    return { 
        type: C.INCREASE_COUNTER, 
        name: name 
    } 
} 
 
export const decreaseCounter = name => { 
    return { 
        type: C.DECREASE_COUNTER, 
        name: name 
    } 
} 
 
export const setVisibilityFilter = filter => { 
    return { 
        type: C.SET_VISIBILITY_FILTER, 
        filter: filter 
    } 
}
```

Így, ha az index.js-ben kicseréljök az actionök eddigi importját az alábbira...

```JavaScript

import * as actions from './actions' 
import { VisibilityFilters } from './actions/constants' 
```

...akkor a `store.dispatch` hívások még tovább egyszerűsödnek:

```JavaScript

store.dispatch(actions.increaseCounter("Bard level")) 
 
store.dispatch(actions.addCounter("Barbarian level", 4)) 
 
store.dispatch(actions.removeCounter("Wizard level")) 
 
store.dispatch(actions.setVisibilityFilter(VisibilityFilters.SHOW_POSITIVE))
```

Gyakorlatilag így már olyan kevés kód kell egy Action elsütéséhez, hogy az alábbi két extra kódsorral (továbbra is az index.js-ben) gyakorlatilag "parancssori alkalmazást" tudunk építeni a meglevő kódbázisól:

```JavaScript

window.store = store
window.actions = actions
```

Így ugyanis a JS konzolon az alkalmazás összes támogatott műveletét ki tudjuk adni, pl. `store.dispatch(actions.addCounter("Sorcerer level", 9))`.

Ezzel már tényleg kész az alkalmazás, és most akár következhetne is a Reactes UI "visszakötése". Előtte azonban nézzünk meg még két dolgot.

* * *

## 11 Aszinkron Actionök

Aszinkron Actionök alatt valójában nem azt értjük, hogy egy már dispatchelt Action aszinkron (az továbbra is rögtön átfut a továbbra is szinkron reducereken), hanem hogy az Action creator tartalmazhat aszinkron műveletet is (pl. API hívás). Ehhez egy extra segédkönyvtárra van szükségünk, ezért állítsuk le a szervert (CTRL+C), és írjuk be parancssorba:

`yarn add redux-thunk --save`
`yarn start`

A Redux Thunk valójában egy Middleware, ezért a store/index.js-ben először kössük is be:

```JavaScript

import thunk from 'redux-thunk'

...

export default (initialState={}) => createStore(myCountersApp, initialState, applyMiddleware(thunk, logMessages))
```

Majd az actions/index.js-ben vegyük fel az első, aszinkron Action creatort:

```JavaScript

export const increaseCounterX5 = name => (dispatch, getState) => { 
    let i = 0; 
    var inv = setInterval( () => { 
        dispatch(increaseCounter(name)) 
        if (++i >= 5) { 
            clearInterval(inv) 
        } 
    }, 1000) 
} 
```

(Igen, kicsit erőltetett példa, de a felépítés ugyanaz, mint egy Promise-os API hívása lenne.)

Tehát az aszinkron Action creator nem visszaadja az Actiont (mint egy factory), hanem dispatch-eli, és ez történhet éppenséggel a jövőben is. Az is látszik, hogy tulajdonképpen *egy függvényt ad vissza* (hasonlóan a Middleware-ekhez), de ezt a részletet itt is szépen elfedi az arrow functionök használata.

Próbáljuk ki – ehhez az index.js-be írjuk be:

`store.dispatch(actions.increaseCounterX5("Bard level"))`

Így a konzolon, a megfelelő késleltetéssel, ötször egymás után meg fog nőni a számláló értéke.

* * *

## 12 Felhasználói üzenetek

Egy szintén nem triviális feladat Redux alkalmazásoknál a felhasználói üzenetek kezelése. Ha notification-szerű üzenetekre gondolunk, amelyek egymás alatt megjelennek, amíg a felhasználó (vagy esetleg egy időzítő) nem üríti őket, akkor egy lehetséges megoldás az állapotba felvenni egy "messages" tömböt, ami stringeket tárol.

Mielőtt megfeledkeznénk róla, egészítsük is ki a logoló Middleware-t a store/index.js-ben:

```JavaScript

`filter: ${state.visibilityFilter} 
counters: ${state.counters.reduce((str, ctr) => str + "[" + ctr.name + ": " + ctr.count + "] ", "")} 
messages: ${state.messages.reduce((str, msg) => str + "[" + msg + "] ", "")}`
```

Az actions/constants.js-ben vegyük fel az Actions objektumba:

```JavaScript

SHOW_MESSAGE: 'SHOW_MESSAGE', 
CLEAR_MESSAGES: 'CLEAR_MESSAGES' 
```

Ezek kezelésére vegyünk fel egy új Reducert egy új fájlban (reducers/messages.js):

```JavaScript

import { Actions as C } from '../actions/constants' 
 
const messages = function (state = [], action) { 
    switch(action.type) 
    { 
        case C.SHOW_MESSAGE: 
            return [ 
                        ...state, 
                        action.message             
                   ] 
        case C.CLEAR_MESSAGES: 
            return [] 
 
        default: 
            return state 
    } 
} 
 
export default messages
```

Bekötéshez a reducers/index.js-ben importáljuk...

`import messages from './messages'`

és vegyük fel a combineReducersnek átadott objektumba is:

```JavaScript

const myCountersApp = combineReducers({ 
  counters, 
  visibilityFilter, 
  messages 
}) 
```

Végül írjuk meg az Action creatoröket az actions/index.js-ben:

```JavaScript

export const showMessage = message => {
    return {
        type: C.SHOW_MESSAGE,
        message: message
    }
}

export const clearMessages = () => {
    return {
        type: C.CLEAR_MESSAGES
    }
}
```

Ez eddig semmi extra – amiért jó, hogy ezt megcsináltuk, hogy végre visszatehetjük az addCountersbe azt a "funkcionalitást", hogy ha a felhasználó már létező nevű számlálót akar a listához adni, akkor nem fog az alkalmazás "csöndben semmit csinálni" (ami nem egy jó felhasználói élmény), hanem üzenetet jelenít meg róla:

```JavaScript

export const addCounter = (name, count) => (dispatch, getState) => {
    
    if (getState().counters.some(ctr => ctr.name === name)) {
        dispatch(showMessage("You already have a counter named " + name))
    }
    else {
        dispatch({
            type: C.ADD_COUNTER,
            payload: { name, count }
        })
    }
}
```

Thunk nélkül ezt azért nem tuduk volna eddig megcsinálni, mert egy "normál" Action creator nem fér hozzá az aktuális állapothoz – nekünk ehhez a funckionalitáshoz azonban szükségünk van rá.

Thunk tehát akkor kell, ha:

- Több Actiont szeretnénk egy Action creatorből dispatchelni
- Aszinkron módon szeretnénk egy vagy több Actiont dispatchelni
- Annak eldöntésére, hogy milyen Actiont kell dispatchelni, szükségünk van az aktuális állapotra

Az új "funkciót" ki is próbálhatjuk úgy, hogy az index.js-ben az egyik addCounter hívást megduplázzuk, pl.

`store.dispatch(actions.addCounter("Barbarian level", 4))`

Másodjára a hívás eredménye egy új üzenet kell legyen az állapotban, változatlan counters tömbbel. Végül próbáljuk ki az üzenetek törlését is:

`store.dispatch(actions.clearMessages())`

Az üzenet a messages tömbben megmarad, egész addig, amíg ezt a hívást ki nem adjuk – függetlenül attól, hogy a számlálókkal közben mi történik.

* * *

## 13 React alapú UI bekötése Redux alkalmazásba

Elérkezett az idő, hogy visszategyük a régi felületet a Redux alkalmazásunkra. Ehhez el kell végeznünk néhány előkészületet és átrendezést a meglevő "kódbázisban".

Először is állítsuk le a szervert (CTRL+C), majd a parancssorban:

`yarn add react-redux --save`
`yarn start`

Erre azért van szükség, mert a Redux alapvetően független a Reacttől; a kifejezetten react-specifikus funkcionalitást külön csomagban találjuk meg.

Ami a saját, eddig elkészült React kódunkat illeti: a legfontosabb koncepcionális különbség, hogy mivel minden állapot a Redux Store-ban tárolódik, a komponenseknek már nincs szükségük saját állapottárolásra – ehelyett mindig Actionöket fognak kezdeményezni, ha állapotot kell változtatniuk, és a React fog gondoskodni arról, hogy azokat a komponenseket, amelyek érintettek az állapotváltozásban, újrarenderelje. Ezért a komponenseinkből "kigyomláljuk" a state-et, és ehelyett lehetővé tesszük, hogy a props-on keresztül állítható legyen, mit jelenítenek meg – ezt fogjuk végső soron a Redux Store megfelelő mezőire bekötni.

Így a CounterCollection kódja az alábbira egyszerűsődik (az export-importok nem változnak):

```JavaScript

class CounterCollection extends React.Component {
    constructor(props, context) {
        super(props, context)
        this.renderSingleCounter = this.renderSingleCounter.bind(this);
    }

    renderSingleCounter(counter) {
        return <Counter name={counter.name}
                        count={counter.count} key={counter.name}
                        onRemove={this.props.onRemoveCounter} />
    }

    render() {
        return <div className="CounterCollection">
            { this.props.counters.map(this.renderSingleCounter) }
            <a className="add-counter-button" onClick={this.props.onAddCounter}><FaPlusCircle /></a>
        </div>;
    }
}
```

A számláló hozzáadására szolgáló gomb itt is eseményt fog elsütni, hasonlóan ahhoz, ahogy a törlés működött eddig a Counternél.

A Countert is hasonló módon alakítjuk át, itt azonban több eseményünk is lesz:

```JavaScript

class Counter extends React.Component {
    constructor(props, context) {
        super(props, context)
        this.increment = this.increment.bind(this) 
        this.decrement = this.decrement.bind(this)
        this.remove = this.remove.bind(this)
    }

    increment() {
        this.props.onIncrement(this.props.name)
    }

    decrement() {
        this.props.onDecrement(this.props.name)
    }

    remove() {
        this.props.onRemove(this.props.name);
    }

    render() {
        return <div className="Counter">
            <span className="current-count">{ this.props.count }</span>

            <h2>{ this.props.name }</h2>

            <button onClick={this.increment}><FaPlusCircle /> Increment</button>
            <button onClick={this.decrement}><FaMinusCircle /> Decrement</button>
            <button onClick={this.remove}><FaTrash /></button>
        </div>;
    }
}
```

Ha ez megvan, mozgassuk át őket, és a hozzájuk tartozó CSS-eket (összesen 4 fájl) egy új, components/ui nevű mappába.

Miért kell egy UI almappa a componentsen belül? Ez előrevetíti, hogy lesz egy másik :) A UI komponensek, vagy "prezentációs komponensek" kizárólag egy állapot / adathalmaz megjelenítésére szolgálnak, annak kinézetére fókuszálnak. Mi most erre a szintre "butítottuk vissza" a meglevő komponenseinket. Ezek a komponensek függetlenek számos, az alkalmazás egészét érintő döntéstől, pl. hogy hogyan tárolódik az állapot (esetünkben Redux Store), vagy hogy honnan jönnek egyáltalán az adatok (pl. API hívások). Tiszta nézetek.

A komponensek másik fajtája a konténer komponens, ami a megfelelő bekötéseket végzi el: a prezentációs komponensek bemeneteit, és az általuk kezdeményezett műveletek továbbítását (pl. a Dispatcher felé, ha Reduxról van szó).

Összefoglalva:

| Szempont                  | Presentational Components | Container Components                     |
|---------------------------|---------------------------|------------------------------------------|
| Mit határoz meg?          | Kinézet (markup, styles)  | Működés (adatelérés, állapotfrissítés)   |
| Redux-függő implementáció | Nem                       | Igen                                     |
| Adatok kinyerése          | Saját props               | Feliratkozik a Redux állapotváltozásokra |
| Adatok módosítása         | Események (props)         | Redux Actionök dispatchelése             |

(ld. még [http://redux.js.org/docs/basics/UsageWithReact.html](http://redux.js.org/docs/basics/UsageWithReact.html))

A konténer komponenseket szerencsére nem kell kézzel írnunk, csak a megfelelő "bekötéseket" kell definiálni.

Hozzunk létre egy új fájlt (components/container/CounterCollection.js):

```JavaScript

import CounterCollection from '../ui/CounterCollection' 
import { connect } from 'react-redux' 
import { VisibilityFilters } from '../../actions/constants' 
 
const mapStateToProps = state => { 
    return { 
        counters: state.counters.filter(ctr => { 
            switch(state.visibilityFilter) 
            { 
                case VisibilityFilters.SHOW_POSITIVE: 
                    return ctr.count > 0 
                case VisibilityFilters.SHOW_NEGATIVE: 
                    return ctr.count < 0 
                case VisibilityFilters.SHOW_ZEROS: 
                    return ctr.count === 0 
                default: 
                    return true 
            } 
        }) 
    } 
} 
 
const Container = connect(mapStateToProps)(CounterCollection) 
export default Container
```

A lényeg a mapStateToProps függvény, aminek segítségével megadhatjuk hogy a state egyes elemei az éppen bekötendő UI komponens mely propertyjeire "kötődjenek be". Itt transzformációt is végezhetünk, pl. ez a helye és ideje annak, hogy a visibilityFilter értékétől függően a számlálóknak csak egy részét jelenítsük meg.

Az index.js tartalmát szinte teljesen lecseréljük, az alábbira:

```JavaScript

import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import CounterCollection from './components/container/CounterCollection'
import initialState from './initialState.json'
import storeFactory from './store'
import './index.css'
import * as actions from './actions' 
import { VisibilityFilters } from './actions/constants' 

let store = storeFactory(initialState)

render(<Provider store={store}>
            <div>
                <h1>MyCounters</h1>
                <CounterCollection />
            </div>
       </Provider>, document.getElementById('root'))

window.store = store;
window.actions = actions; 
```

(Az utolsó két sorra – és az utolsó két importra – csak azért van szükség, hogy tudjuk addig is módosítgatni az állapotot, amíg az Actionök bekötésével nem vagyunk meg.)

Mit látunk?

- Az alkalmazás gyökere a Provider, ami gondoskodik a Store elérhetővé tételéről a fában lejjebb található Container komponensek számára
- A CounterCollection egy Container komponens. Importálhatnánk és megjeleníthetnénk az ő UI megfelelőjét is, de akkor nem működnének a Store bekötések

Próbáljuk ki! A felületen megjelenik a kezdeti állapot, de a gombok természetesen nem csinálnak semmit (azon kívül, hogy hibát dobnak). Ha viszont a konzolon "kézzel" Actionöket dispatchelünk, a felület annak megfelelően frissülni fog:

```
store.dispatch(actions.decreaseCounter("Bard level"))
store.dispatch(actions.decreaseCounter("Bard level"))
store.dispatch(actions.setVisibilityFilter("SHOW_POSITIVE"))
```

Az utolsó utasítás hatására a "Bard level" számláló el fog tűnni, hiszen már nem fog megfelelni a beállított filternek.

Ahhoz, hogy a műveletek a felületről is működjenek, a mapStatePropshoz nagyon hasonló mapDispatchToProps leképezésre lesz szükségünk. A components/container/CounterCollection.js-ben:

```JavaScript

import CounterCollection from '../ui/CounterCollection' 
import { connect } from 'react-redux' 
import { VisibilityFilters } from '../../actions/constants' 
import { addCounterWithPrompt } from '../../actions/'

const mapStateToProps = ...

const mapDispatchToProps = dispatch => { 
    return { 
        onAddCounter() { dispatch(addCounterWithPrompt()) } 
    } 
} 
 
const Container = connect(mapStateToProps, mapDispatchToProps)(CounterCollection)
export default Container
```

Tehát a UI komponens onAddCounter eseményének hatására elsütjük az addCounterWithPrompt Actiont.

Az addCounterWithPrompt egy új Action, ami az alkalmazásunk első verziójához hasonlóan Promptban kéri be a számláló nevét. (Nyilván elegánsabb lenne saját modalt írni, és annak az állapotát is kezelni, de a kódbázis további bonyolításának elkerülése végett most elégedjünk meg ezzel a szerény megoldással.) Az actions/index.js-be írjuk be:

```JavaScript

export const addCounterWithPrompt = () => (dispatch, getState) => { 
    let name = prompt("Name of the new counter") 
    dispatch(addCounter(name, 0)) 
} 
```

Ha most kipróbáljuk, új számlálók hozzáadása már működni fog (ha két ugyanolyan nevűt megpróbálunk hozzáadni, annak ugyan nem lesz a felületen látható hatása, de a konzolon ott lesz a hozzá tartozó `SHOW_MESSAGE` Action), de a számlálók maguk továbbra sem. Ehhez természetesen az kell, hogy a Counter komponensnek is elkészítsük a konténer változatát.

components/container/Counter.js:

```JavaScript

import Counter from '../ui/Counter' 
import { connect } from 'react-redux' 
import { increaseCounter, decreaseCounter, removeCounter } from '../../actions/' 
 
const mapStateToProps = (state, ownProps) => { 
    return { 
        name: ownProps.name, 
        count: ownProps.count 
    } 
} 
 
const mapDispatchToProps = dispatch => { 
    return { 
        onIncrement(name) { dispatch(increaseCounter(name)) }, 
        onDecrement(name) { dispatch(decreaseCounter(name)) }, 
        onRemove(name) { dispatch(removeCounter(name)) } 
    } 
} 
 
const Container = connect(mapStateToProps, mapDispatchToProps)(Counter) 
export default Container
```

Ebben az esetben tehát a mapStateToProps-ban nem a Redux State-ből nyerjük ki az állapotot, hanem a konténer komponens közvetlenül fog JSX attribútumokat fogadni. Ez azért jó, mert így annak a "terhe", hogy a Redux State-ben a megfelelő számlálót kikeressük a Counters listából, a CounterCollectionnél marad – hiszen ott ez az információ már úgyis rendelkezésre áll, és kényelmesen átadható a Counter komponensnek `renderSingleCounter` függvényen keresztül.

Ami azt illeti, mivel a konténer komponens "interfésze" megegyezik a UI komponensével, amit csomagol, így a ui/CounterCollectionben elég a vonatkozó importot lecserélni:

`import Counter from '../container/Counter'`

Ha ez megvan, már a számlálókon található gombok is működni fognak!

Egyébként az, hogy a konténer komponens átadja a saját props értékeit a csomagolt UI komponensnek, annyira alapvető, hogy ha a mapStateToProps összesen ennyit csinál, akkor teljesen el is hagyható.

Tehát a container/Counter.js-ből törölhetjük is – ilyenkor a connect hívás az alábbiak szerint módosul:

`const Container = connect(null, mapDispatchToProps)(Counter)`

Ezzel elkészült a Redux alapú alkalmazás bekötése a React felületre – mostmár minden működik, ami a Redux Store bevezetése előtt működött (és kicsit még több is).

* * *

## 14 Számlálók mentése

Egy konkrét funkció, amit sokkal nehezebb lett volna megcsinálni, amíg még nem álltunk át Reduxra, az a számlálóink mentése. Mit is érne az alkalmazás, ha a fül becsukásakor elveszne, amit addig összeszámoltunk?

Így azonban nagyon egyszerű lesz. Először is írjunk egy új Middleware-t, ami automatikusan ment, minden állapotváltozáskor. (Emlékeztetőül: a Middleware-ek a store/index.js-ben vannak.)

```JavaScript

const autoSave = store => next => action => { 
    let result = next(action) 
    const currentStateString = JSON.stringify(store.getState()) 
    localStorage.setItem("mycounters-autosave", currentStateString) 
    return result 
} 
 
export default (initialState={}) => createStore(myCountersApp, initialState, applyMiddleware(thunk, logMessages, autoSave))
```

Ha ez megvan, már csak annyi a dolgunk, hogy az alkalmazás indulásakor be is töltsük ezt az állapotot. Az index.js-ben írjuk át a Store létrehozását így:

```JavaScript

let savedStateString = localStorage.getItem("mycounters-autosave") 
let store = storeFactory( savedStateString ? JSON.parse(savedStateString) : initialState)
```

Próbáljuk ki – hozzunk létre számlálókat, növeljünk meg néhányat, csukjuk be a böngészőt. Újranyitáskor meg kell legyenek a korábban beállított értékek!

* * *

## 15 React és Redux DevTools

Eddig nem nagyon néztük, de ha telepítettük a leírás elején említett Chrome kiegészítőket, akkor a konzolon kívül további eszközöket is kapunk arra, hogy az alkalmazásunkat vizsgálhassuk.

A kiegészítők hatására a fejlesztőeszközök panel két új füllel gazdagodik: React és Redux. A React fül a komponens fánk vizsgálatára szolgál, és fejlesztői közreműködés nélkül is működik (vagyis mások honlapját is vizsgálhatjuk vele, amennyiben az Reactet használ). A Redux panel használata azonban igényel bizonyos előkészületeket.

Először is telepítünk egy új csomagot. Állítsuk le a szervert (CTRL+C), majd a parancssorban:

`yarn add redux-devtools-extension --save`
`yarn start`

Ha ezzel megvagyunk, a kiegészítőt egy segédfüggvény felhasználásával köthetjük be a Store-unkba. Tehát a store/index.js-ben:

```JavaScript

import { composeWithDevTools } from 'redux-devtools-extension'

...

export default (initialState={}) => createStore(myCountersApp, initialState, composeWithDevTools( applyMiddleware(thunk, logMessages, autoSave) ))
```

Így már használhatjuk a Redux panelt a fejlesztőeszközöknél. Rengeteg funkciója van, például

- Actionök naplózása, a hatásukra bekövetkezett State változások megjelenítése
- Állapot mentése, importálása, exportálása
- Actionök visszajátszása időzítésekkel
- Store változásainak letiltása
- Actionök "kézi" elsütése
- Tesztesetek generálása az egyes Actionökhöz

* * *

*A teljes kód elérhető GitHubon: [https://github.com/madve2/mycounters-react](https://github.com/madve2/mycounters-react)*

*A commit üzenetekben szereplő számozás megfelel a leírásban látható számozásnak, így ha valamilyen köztes állapotra vagy kíváncsi, azt is könnyen letöltheted.*