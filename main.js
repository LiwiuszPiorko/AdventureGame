const textElement=document.getElementById('text');
const optionButtonsElement=document.getElementById('option-buttons');

let state={};

function startGame(){
    state={}
    showTextNode(1)
}

function showTextNode(textNodeIndex){
    const textNode=textNodes.find(textNode=>textNode.id===textNodeIndex)
    textElement.innerText=textNode.text
    while(optionButtonsElement.firstChild){
        optionButtonsElement.removeChild(optionButtonsElement.firstChild)
    }

    textNode.options.forEach(option=>{
        if(showOption(option)){
            const button=document.createElement('button')
            button.innerText=option.text
            button.classList.add('btn')
            button.addEventListener('click',()=>selectOption(option))
            optionButtonsElement.appendChild(button)

        }
    })
}
function showOption(option){
    return option.requiredState==null||option.requiredState(state)
}

function selectOption(option){
    const nextTextNodeId=option.nextText
    if(nextTextNodeId<=0){
        return startGame()
    }
    state=Object.assign(state, option.setState)
    showTextNode(nextTextNodeId)
}

const textNodes = [
    {
        id:1,
        text:'Budzisz się w nieznanym sobie miejscu i próbujesz zorientować sie gdzie sie znajdujesz.  Przeszukując pomieszczenie dostrzegasz szklaną kulę, w której uwięzione jest biało-niebieskie, pulsujące światło.',
        options:[
            {
                text: 'Podnieś przedmiot',
                setState:{blueGoo:true},
                nextText:2
            },
            {
                text:'Nie podnoś',
                nextText:2
            }
        ]
    },
    {
        id:2,
        text:'Wychodzisz z pomieszczenia i krązysz przez jakiś czas po wyglądających identycznie korytarzach. W jednym z nich napotykasz goblińskiego kupca.',
        options:[
            {
                text:'Wymień kulę na miecz',
                requiredState:(currentState)=>currentState.blueGoo,
                setState:{blueGoo:false, sword:true},
                nextText:3
            },
            {
                text:'Wymień kulę na tarczę',
                requiredState:(currentState)=>currentState.blueGoo,
                setState:{blueGoo:false, shield:true},
                nextText:3
            },
            {
                text:'Ignoruj kupca',
                nextText:3
            }
        ]
            },
        {
            id:3,
                text:'Opuszczasz kupca i ruszasz dalej swoja drogą. Po dłuższym czasie dochodzisz do miasteczka, w którym stoi zamek',
                options:[
            {
                text:'Eksploruj zamek',
                nextText:4
            },
            {
                text:'Znajdź pokój w gospodzie',
                nextText:5
            },
            {
                text:'Znajdź miejsce w stodole',
                nextText:6
            }

                ]
            },
            {
                id:4,
                text:'Ponieważ jesteś nieziemsko zmęczony, kładziesz się pod ścianą i zasypiasz tak głeboko, że nie słyszysz zbliżającego sie do Ciebie potwora...',
                options:[
                    {text:'Zacznij od nowa',
                    nextText:-1
                
                }
                ]
            },
            {
                id: 5,
                text: 'Ponieważ nie posiadasz pieniędzy na wynajem pokoju, włamujesz się do tawernianej piwniczki z winami.Po kilku godzinach znajduje Cie w niej właściciel. Wzywa straże a Ty lądujesz w celi.',
                options: [
                  {
                    text: 'Zacznij od nowa',
                    nextText: -1
                  }
                ]
              },
              {
                id: 6,
                text: 'Wypoczęty i pełen energii ruszasz do zamku.',
                options: [
                  {
                    text: 'Wyruszasz do zamku',
                    nextText: 7
                  }
                ]
              },
              {
                id: 7,
                text: 'Podczas eksploracji zamku napotykasz na swej drodze ogromne monstrum.',
                options: [
                  {
                    text: 'Uciekasz!',
                    nextText: 8
                  },
                  {
                    text: 'Zaatakuj mieczem',
                    requiredState: (currentState) => currentState.sword,
                    nextText: 9
                  },
                  {
                    text: 'Osłoń się tarczą',
                    requiredState: (currentState) => currentState.shield,
                    nextText: 10
                  },
                  {
                    text: 'Rzuć w potwora szklaną kulą',
                    requiredState: (currentState) => currentState.blueGoo,
                    nextText: 11
                  }
                ]
              },
              {
                id: 8,
                text: 'Potwór z łatwością dogania Cię i chwyta w swoje ogromne łapska.',
                options: [
                  {
                    text: 'Zacznij od nowa',
                    nextText: -1
                  }
                ]
              },
              {
                id: 9,
                text: 'No chyba nie myślałeś, że pokonasz potwora swoim mieczykiem...bohaterze?.',
                options: [
                  {
                    text: 'Zacznij od nowa',
                    nextText: -1
                  }
                ]
              },
              {
                id: 10,
                text: 'Potwór zjada Cię razem z tarczą.',
                options: [
                  {
                    text: '',
                    nextText: -1
                  }
                ]
              },
              {
                id: 11,
                text: 'Potwór trafiony rzuconym przez Ciebie przedmiotem eksploduje w fontannie krwi i wnętrzności. Ponure zamczysko należy teraz do Ciebie.',
                options: [
                  {
                    text: 'Gratulacje. Zagraj raz jeszcze.',
                    nextText: -1
                  }
                ]
              }

        ]
startGame()