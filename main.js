"use strict";
let buttons, display;
var count, endedgame;

window.addEventListener('load', (e)=>{
    buttons = Array.from(document.getElementsByClassName("button"));
    display = document.querySelector("#display");
    count = 1;
    endedgame = false;
});

function rst()
{
    count = 1;
    buttons.map(button => {
        button.innerText = "";
    });
    endedgame = false;
}

function get_winner(winner_name)
{
    const el = document.createElement("div");
    const winner = document.createElement("div");
    winner.classList.add("winner");
    winner.innerText = winner_name + " Wins!";
    el.appendChild(winner);
    const reset = document.createElement("div");
    reset.addEventListener('click', (e) => {
        display.removeChild(el);
        rst();
    });
    reset.classList.add("reset_button");
    reset.innerText = "RESET";
    el.appendChild(reset);
    el.classList.add("winner_display");
    return el;
}


window.addEventListener('load', (e)=>{

    //reset button

    buttons.map(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault()
            if(endedgame)
                return;
            let str = "";
            if(count % 2 === 1)
                str = "❌";
            else
                str = "⚪";
            if(e.target.innerText!=="")
                return;
            count++;
            e.target.innerText = str;
            for(let i=0;i<3;i++)
            {
                let end=false;
                for(let j=i;j<9;j+=3)
                {
                    if(buttons[j].innerText==="")
                    {
                        //console.log(j);
                        end=true;
                        break;
                    }

                }
                if(end) continue;
                if((buttons[i].innerText === buttons[i+3].innerText) &&  (buttons[i].innerText === buttons[i+6].innerText))
                {
                    //console.log(buttons[i].innerText + " Wins!");
                    display.appendChild(get_winner(buttons[i].innerText));
                    endedgame = true;
                    return;
                }
            }

            for(let i=1;i<9;i+=3)
            {
                let end=false;
                for(let j=i-1;j<=i+1;j++)
                {
                    if(buttons[j].innerText==="")
                    {
                        end=true;
                        break;
                    }

                }
                if(end) continue;
                if((buttons[i].innerText === buttons[i-1].innerText) &&  (buttons[i].innerText === buttons[i+1].innerText))
                {
                    //console.log(buttons[i].innerText + " Wins!");
                    display.appendChild(get_winner(buttons[i].innerText));
                    endedgame = true;
                    return;
                }
            }
            let end=false;
            for(let j=0;j<=8;j+=4)
            {
                if(buttons[j].innerText==="")
                {
                    end=true;
                    break;
                }
            }
            if((!end) && (buttons[0].innerText === buttons[4].innerText) &&  (buttons[0].innerText === buttons[8].innerText))
            {
                //console.log(buttons[4].innerText + " Wins!");
                display.appendChild(get_winner(buttons[4].innerText));
                endedgame = true;
                return;
            }
            end = false;
            for(let j=2;j<=6;j+=2)
            {
                if(buttons[j].innerText==="")
                {
                    end=true;
                    break;
                }
            }
            if(end) return;
            if((buttons[2].innerText === buttons[4].innerText) &&  (buttons[2].innerText === buttons[6].innerText))
            {
                //console.log(buttons[4].innerText + " Wins!");
                display.appendChild(get_winner(buttons[4].innerText));
                endedgame = true;
                return;
            }
        });
    })
});