/*
 * Author : Philippe BACHOUR
 * 
 * */

/** _____________________________________TEETH CLASS____________________________________________________ **/
function Teeth(id, posx, posy)
{
    this.m_Exists = true;
    this.m_Id = id;
    this.m_ProbingDepth = { a:0 , b:0 , c:0 };
    this.m_ImgFront = new Image();
    
    this.m_Rect = { x:posx, y:posy, w:102, h:239 };
    
    this.draw = function()
    {
        dsp.m_Context.clearRect(this.m_Rect.x, this.m_Rect.y, this.m_Rect.w, this.m_Rect.h);
        var offset = 105;
        var sign = -1;
        if (this.m_Id > 30)
        {
            offset = 135;
            sign = 1;
        }
		if (this.m_Exists)
        {
            dsp.m_Context.drawImage(this.m_ImgFront, this.m_Rect.x, this.m_Rect.y);
            dsp.m_Context.beginPath();
            
            if (this.m_Id == 18 || this.m_Id == 48 || !getPrevTeeth(this.m_Id).m_Exists)
            {
                dsp.m_Context.moveTo(this.m_Rect.x + this.m_Rect.w / 4, (this.m_Rect.y + this.m_Rect.h - offset) + sign * this.m_ProbingDepth.a * HEIGHT_STEP);
            }
            else
            {
                var pt = getPrevTeeth(this.m_Id);
                dsp.m_Context.moveTo(pt.m_Rect.x + pt.m_Rect.w * 3 / 4, (pt.m_Rect.y + pt.m_Rect.h - offset) + sign * pt.m_ProbingDepth.c * HEIGHT_STEP);
                dsp.m_Context.lineTo(this.m_Rect.x + this.m_Rect.w / 4, (this.m_Rect.y + this.m_Rect.h - offset) + sign * this.m_ProbingDepth.a * HEIGHT_STEP);
            }
            dsp.m_Context.lineTo(this.m_Rect.x + this.m_Rect.w / 2, (this.m_Rect.y + this.m_Rect.h - offset) + sign * this.m_ProbingDepth.b * HEIGHT_STEP);
            dsp.m_Context.lineTo(this.m_Rect.x + this.m_Rect.w * 3 / 4, (this.m_Rect.y + this.m_Rect.h - offset) + sign * this.m_ProbingDepth.c * HEIGHT_STEP);
            dsp.m_Context.lineWidth = 2;
            dsp.m_Context.strokeStyle = '#B51515';
            dsp.m_Context.stroke();
        }
    }
}

/** _________________________________________________________________________________________________ **/

var TeethMajor = [
    "18", "17", "16", "15", "14", "13", "12", "11", "21", "22", "23", "24", "25", "26", "27", "28",
    "48", "47", "46", "45", "44", "43", "42", "41", "31", "32", "33", "34", "35", "36", "37", "38"
];
var TeethMinor = [
    "a", "b", "c"
];
var CurrentTeeth = {major:16,minor:0,asObject:-1};

startup();

document.getElementById('StartBut').addEventListener("click", startRecognition, false);
document.getElementById('StopBut').addEventListener("click", stopRecognition, false);
var dbg = document.getElementById('dbg');
var final_transcript = '';
var recognition;
var CurrentField = document.getElementById('48a');




var DICTIONNARY = {
    Missing:'',
    StopReco:'',
    Tooth:''
};

function setLanguage(lang)
{
    switch(lang)
    {
        case 'fr-FR':
            DICTIONNARY.Missing = ('absente');
            DICTIONNARY.StopReco = ('stop');
            DICTIONNARY.Tooth = ('dent');
            break;
        case 'en-US':
            DICTIONNARY.Missing = ('missing');
            DICTIONNARY.StopReco = ('stop');
            DICTIONNARY.Tooth = ('tooth');
            break;
        default:break;
    }
}

function startRecognition(event)
{
    printf("Recognition started :\n");
    final_transcript = '';
    recognition.lang = document.getElementById('lang').value;
    setLanguage(recognition.lang);

    CurrentField.focus();
    getCurrentTeeth();
    recognition.start();
}
function stopRecognition()
{
    recognition.stop();
}

function startup()
{    
    generatePageContent();
    
    
    if (!('webkitSpeechRecognition' in window))
    {
        printf("Speech API not supported by your browser, you must use Chrome version 25 or later.");
    }
    else
    {
        recognition = new webkitSpeechRecognition();
        recognition.continuous = true;
        recognition.interimResults = false;
    
        recognition.onstart = function()
        {
            var str = TeethMajor[CurrentTeeth.major];
            switch (CurrentTeeth.minor)
            {
                case 0:
                    (CurrentTeeth.asObject.m_Id < 40 && CurrentTeeth.asObject.m_Id > 20) ? str += ' mesial' : str += ' distal';
                    break;
                case 1:
                    str += ' median';
                    break;
                case 2:
                    (CurrentTeeth.asObject.m_Id < 40 && CurrentTeeth.asObject.m_Id > 20) ? str += ' distal' : str += ' mesial';
                    break;
                default:break;
            }
            printf("Starting from " + str);
        };
        recognition.onresult = function(event)
        {
            for (var i = event.resultIndex ; i < event.results.length ; ++i)
            {
                if (event.results[i][0].transcript.includes(DICTIONNARY.StopReco))
                {
                    recognition.stop();
                    printf("End of recognition.\n");
                }
                else if (event.results[i][0].transcript.includes(DICTIONNARY.Tooth))
                {
                    
                }
                else if (event.results[i][0].transcript.includes(DICTIONNARY.Missing))
                {
                    CurrentTeeth.minor = 0;
                    getCurrentField();
                    CurrentField.value = 0;
                    
                    CurrentTeeth.minor = 1;
                    getCurrentField();
                    CurrentField.value = 0;
                    
                    CurrentTeeth.minor = 2;
                    getCurrentField();
                    CurrentField.value = 0;
                    
                    CurrentTeeth.asObject.m_Exists = false;
                    CurrentTeeth.asObject.draw();
                    
                    getNextTeeth();
                    getCurrentField();
                    getCurrentTeeth();
                }
                else if(parseInt(event.results[i][0].transcript) || event.results[i][0].transcript.includes("un"))
                {
                    if (event.results[i][0].transcript.includes("un"))
                    {
                        CurrentField.value = 1;
                        switch (TeethMinor[CurrentTeeth.minor])
                        {
                            case 'a':
                                CurrentTeeth.asObject.m_ProbingDepth.a = 1;
                                break;
                            case 'b':
                                CurrentTeeth.asObject.m_ProbingDepth.b = 1;
                                break;
                            case 'c':
                                CurrentTeeth.asObject.m_ProbingDepth.c = 1;
                                break;
                            default:break;
                        }
                    }
                    else
                    {
                        CurrentField.value = parseInt(event.results[i][0].transcript);
                        switch (TeethMinor[CurrentTeeth.minor])
                        {
                            case 'a':
                                CurrentTeeth.asObject.m_ProbingDepth.a = parseInt(event.results[i][0].transcript);
                                break;
                            case 'b':
                                CurrentTeeth.asObject.m_ProbingDepth.b = parseInt(event.results[i][0].transcript);
                                break;
                            case 'c':
                                CurrentTeeth.asObject.m_ProbingDepth.c = parseInt(event.results[i][0].transcript);
                                break;
                            default:break;
                        }
                    }
                    CurrentTeeth.asObject.draw();
                    printf("Found teeth with ID : " + CurrentTeeth.asObject.m_Id + " for " + TeethMajor[CurrentTeeth.major] + " filling " + CurrentField.id + '\n');
                    getNextTeeth();
                    getCurrentField();
                    getCurrentTeeth();
                }
                else
                    printf("Unknown transcript : " + event.results[i][0].transcript);
            }
        };
        recognition.onerror = function(event) 
        {
        
        };
        recognition.onend = function()
        {
        
        };
    }
    
    addInputEvListeners();
}

function printf(string)
{
    dbg.value += string;
    dbg.scrollTop = dbg.scrollHeight;
}

function getNextTeeth()
{
    CurrentTeeth.minor++;
    
    if (CurrentTeeth.minor == 3)
    {
        CurrentTeeth.minor = 0;
        CurrentTeeth.major++;
        
        if (CurrentTeeth.major == TeethMajor.length)
            CurrentTeeth.major = 0;
    }
}

function getCurrentField()
{
    CurrentField = document.getElementById(TeethMajor[CurrentTeeth.major] + TeethMinor[CurrentTeeth.minor]);
    CurrentField.focus();    
}
function setTeethOnClick()
{
    var s = document.activeElement.id.substr(0, 2);
    for (var i = 0 ; i < 32 ; ++i)
        if (s == TeethMajor[i])
        {
            CurrentTeeth.major = i;
            break;
        }
    switch (document.activeElement.id.substr(2, 1))
    {
        case 'a' :
            CurrentTeeth.minor = 0;
            break;
        case 'b' :
            CurrentTeeth.minor = 1;
            break;
        case 'c' :
            CurrentTeeth.minor = 2;
            break;
    }
    CurrentField = document.getElementById(TeethMajor[CurrentTeeth.major] + TeethMinor[CurrentTeeth.minor]);
    getCurrentTeeth();
    
}
function getCurrentTeeth()
{
    for (var i = 0 ; i < 32 ; ++i)
    {
        if (dsp.m_Teeth[i].m_Id == parseInt(CurrentField.id.substr(0, 2)))
        {
            CurrentTeeth.asObject = dsp.m_Teeth[i];
            break;
        }
    }
}


var dsp = new CRTDisplay();
dsp.init();

var HEIGHT_STEP = 5; // px Y step offset



function getPrevTeeth(id)
{
    if (id < 18 && id > 10)
        return getTeethById(id + 1);
    else if (id > 21 && id < 29)
        return getTeethById(id - 1);
    else if (id < 48 && id > 40)
        return getTeethById(id + 1)
    else if (id > 31 && id < 39)
        return getTeethById(id - 1);
    else if (id == 21) return getTeethById(11);
    else if (id == 31) return getTeethById(41);
    else alert('big problem');
}

function getTeethById(id)
{
    for (var i = 0 ; i < 32 ; ++i)
    {
        if (dsp.m_Teeth[i].m_Id == id)
        {
            return dsp.m_Teeth[i];
        }
    }
}

function CRTDisplay()
{
    this.m_Canvas = document.getElementById('vrc_display');
    this.m_Context = this.m_Canvas.getContext('2d');
    this.m_LeftToLoad = 32;
    this.m_Canvas.width = 1632;
    this.m_Canvas.height = 478;

    this.m_Teeth = new Array(32);
    
    this.init = function()
    {
        this.m_CellWidth = this.m_Canvas.width / 16;
        this.m_CellHeight = this.m_Canvas.height / 2;
        
        for (var i = 11 ; i < 19 ; i++)
        {
            this.m_Teeth[i - 11] = new Teeth(i, this.m_CellWidth * - (i - 18), 0);
			
            this.m_Teeth[i - 11].m_ImgFront.src = "https://github.com/philippe-bachour/vr_charting/raw/master/Images/" + i + ".png";
            this.m_Teeth[i - 11].m_ImgFront.onload = this.checkLoadState.bind(this);
        }
        for (var i = 21 ; i < 29 ; i++)
        {
            this.m_Teeth[i - 13] = new Teeth(i, this.m_CellWidth * (i-13), 0);
			
            this.m_Teeth[i - 13].m_ImgFront.src = "https://github.com/philippe-bachour/vr_charting/raw/master/Images/" + i + ".png";
            this.m_Teeth[i - 13].m_ImgFront.onload = this.checkLoadState.bind(this); 
        }
        for (var i = 31 ; i < 39 ; i++)
        {
            this.m_Teeth[i - 15] = new Teeth(i, this.m_CellWidth * (i-23), 239);
			
            this.m_Teeth[i - 15].m_ImgFront.src = "https://github.com/philippe-bachour/vr_charting/raw/master/Images/" + i + ".png"; 
            this.m_Teeth[i - 15].m_ImgFront.onload = this.checkLoadState.bind(this); 
        }
        for (var i = 41 ; i < 49 ; i++)
        {
            this.m_Teeth[i - 17] = new Teeth(i, this.m_CellWidth * -(i - 48), 239);
			
            this.m_Teeth[i - 17].m_ImgFront.src = "https://github.com/philippe-bachour/vr_charting/raw/master/Images/" + i + ".png";
            this.m_Teeth[i - 17].m_ImgFront.onload = this.checkLoadState.bind(this);
        }
    }
    
    this.checkLoadState = function()
    {
        --this.m_LeftToLoad;
        if (this.m_LeftToLoad == 0)
        {
            this.drawBackground();
        }
    }
    
    this.drawBackground = function()
    {
		this.m_Context.fillStyle="#353535";
        this.m_Context.clearRect(0, 0, this.m_Canvas.width, this.m_Canvas.height);
        
        for (var i = 0 ; i < this.m_Teeth.length ; ++i)
        {
            this.m_Teeth[i].draw();
        }
    }
    
}

function generatePageContent()
{
    document.getElementById('vr_charting').innerHTML = 'Commandes vocales/Voice commands :<br>\
    <ul>\
        <li>"stop" : arrêter la reconnaissance / "stop" : stop speech recognition.</li>\
        <li>"absente" : dent absente / "missing" : missing tooth</li>\
        <li>dites un nombre pour remplir la case ayant le focus / say a number to fill in the focused input</li>\
    </ul>\
    <p>Vous pouvez également entrer des valeurs directement dans les champs au clavier / You can also set the inputs\'s value with your keyboard</p>\
    <p>Cliquez sur un input pour définir la case de départ / Click on an input to select where to start setting values</p>\
    <input type="button" value="Start recognition" id="StartBut">\
    <input type="button" value="Stop recognition" id="StopBut"> \
    <select id="lang">\
        <option value="fr-FR" selected>Français</option>\
        <option value="en-US">English US</option>\
    </select> \
    <table style="border:1px solid black;text-align:center;width:calc(100vw-17px);"> \
        <tr> \
            <td colspan="3">18</td> \
            <td colspan="3">17</td> \
            <td colspan="3">16</td> \
            <td colspan="3">15</td> \
            <td colspan="3">14</td> \
            <td colspan="3">13</td> \
            <td colspan="3">12</td> \
            <td colspan="3">11</td> \
            <td colspan="3">21</td> \
            <td colspan="3">22</td> \
            <td colspan="3">23</td> \
            <td colspan="3">24</td> \
            <td colspan="3">25</td> \
            <td colspan="3">26</td> \
            <td colspan="3">27</td> \
            <td colspan="3">28</td> \
        </tr> \
        <tr> \
            <td><input type="text" size="1" id="18a"></td> \
            <td><input type="text" size="1" id="18b"></td> \
            <td><input type="text" size="1" id="18c"></td> \
            <td><input type="text" size="1" id="17a"></td> \
            <td><input type="text" size="1" id="17b"></td> \
            <td><input type="text" size="1" id="17c"></td> \
            <td><input type="text" size="1" id="16a"></td> \
            <td><input type="text" size="1" id="16b"></td> \
            <td><input type="text" size="1" id="16c"></td> \
            <td><input type="text" size="1" id="15a"></td> \
            <td><input type="text" size="1" id="15b"></td> \
            <td><input type="text" size="1" id="15c"></td> \
            <td><input type="text" size="1" id="14a"></td> \
            <td><input type="text" size="1" id="14b"></td> \
            <td><input type="text" size="1" id="14c"></td> \
            <td><input type="text" size="1" id="13a"></td> \
            <td><input type="text" size="1" id="13b"></td> \
            <td><input type="text" size="1" id="13c"></td> \
            <td><input type="text" size="1" id="12a"></td> \
            <td><input type="text" size="1" id="12b"></td> \
            <td><input type="text" size="1" id="12c"></td> \
            <td><input type="text" size="1" id="11a"></td> \
            <td><input type="text" size="1" id="11b"></td> \
            <td><input type="text" size="1" id="11c"></td> \
                                                           \
            <td><input type="text" size="1" id="21a"></td> \
            <td><input type="text" size="1" id="21b"></td> \
            <td><input type="text" size="1" id="21c"></td> \
            <td><input type="text" size="1" id="22a"></td> \
            <td><input type="text" size="1" id="22b"></td> \
            <td><input type="text" size="1" id="22c"></td> \
            <td><input type="text" size="1" id="23a"></td> \
            <td><input type="text" size="1" id="23b"></td> \
            <td><input type="text" size="1" id="23c"></td> \
            <td><input type="text" size="1" id="24a"></td> \
            <td><input type="text" size="1" id="24b"></td> \
            <td><input type="text" size="1" id="24c"></td> \
            <td><input type="text" size="1" id="25a"></td> \
            <td><input type="text" size="1" id="25b"></td> \
            <td><input type="text" size="1" id="25c"></td> \
            <td><input type="text" size="1" id="26a"></td> \
            <td><input type="text" size="1" id="26b"></td> \
            <td><input type="text" size="1" id="26c"></td> \
            <td><input type="text" size="1" id="27a"></td> \
            <td><input type="text" size="1" id="27b"></td> \
            <td><input type="text" size="1" id="27c"></td> \
            <td><input type="text" size="1" id="28a"></td> \
            <td><input type="text" size="1" id="28b"></td> \
            <td><input type="text" size="1" id="28c"></td> \
        </tr> \
        <tr> \
            <td colspan="48"> \
            <div style="width:100%;"> \
                <canvas id="vrc_display" style="display:inline-block;max-width:100%;max-height:100%;"></canvas> \
            </div> \
            </td> \
        </tr> \
        \
        <tr> \
            <td colspan="3">48</td> \
            <td colspan="3">47</td> \
            <td colspan="3">46</td> \
            <td colspan="3">45</td> \
            <td colspan="3">44</td> \
            <td colspan="3">43</td> \
            <td colspan="3">42</td> \
            <td colspan="3">41</td> \
            <td colspan="3">31</td> \
            <td colspan="3">32</td> \
            <td colspan="3">33</td> \
            <td colspan="3">34</td> \
            <td colspan="3">35</td> \
            <td colspan="3">36</td> \
            <td colspan="3">37</td> \
            <td colspan="3">38</td> \
        </tr> \
        <tr> \
            <td><input type="text" size="1" id="48a"></td> \
            <td><input type="text" size="1" id="48b"></td> \
            <td><input type="text" size="1" id="48c"></td> \
            <td><input type="text" size="1" id="47a"></td> \
            <td><input type="text" size="1" id="47b"></td> \
            <td><input type="text" size="1" id="47c"></td> \
            <td><input type="text" size="1" id="46a"></td> \
            <td><input type="text" size="1" id="46b"></td> \
            <td><input type="text" size="1" id="46c"></td> \
            <td><input type="text" size="1" id="45a"></td> \
            <td><input type="text" size="1" id="45b"></td> \
            <td><input type="text" size="1" id="45c"></td> \
            <td><input type="text" size="1" id="44a"></td> \
            <td><input type="text" size="1" id="44b"></td> \
            <td><input type="text" size="1" id="44c"></td> \
            <td><input type="text" size="1" id="43a"></td> \
            <td><input type="text" size="1" id="43b"></td> \
            <td><input type="text" size="1" id="43c"></td> \
            <td><input type="text" size="1" id="42a"></td> \
            <td><input type="text" size="1" id="42b"></td> \
            <td><input type="text" size="1" id="42c"></td> \
            <td><input type="text" size="1" id="41a"></td> \
            <td><input type="text" size="1" id="41b"></td> \
            <td><input type="text" size="1" id="41c"></td> \
                                                           \
            <td><input type="text" size="1" id="31a"></td> \
            <td><input type="text" size="1" id="31b"></td> \
            <td><input type="text" size="1" id="31c"></td> \
            <td><input type="text" size="1" id="32a"></td> \
            <td><input type="text" size="1" id="32b"></td> \
            <td><input type="text" size="1" id="32c"></td> \
            <td><input type="text" size="1" id="33a"></td> \
            <td><input type="text" size="1" id="33b"></td> \
            <td><input type="text" size="1" id="33c"></td> \
            <td><input type="text" size="1" id="34a"></td> \
            <td><input type="text" size="1" id="34b"></td> \
            <td><input type="text" size="1" id="34c"></td> \
            <td><input type="text" size="1" id="35a"></td> \
            <td><input type="text" size="1" id="35b"></td> \
            <td><input type="text" size="1" id="35c"></td> \
            <td><input type="text" size="1" id="36a"></td> \
            <td><input type="text" size="1" id="36b"></td> \
            <td><input type="text" size="1" id="36c"></td> \
            <td><input type="text" size="1" id="37a"></td> \
            <td><input type="text" size="1" id="37b"></td> \
            <td><input type="text" size="1" id="37c"></td> \
            <td><input type="text" size="1" id="38a"></td> \
            <td><input type="text" size="1" id="38b"></td> \
            <td><input type="text" size="1" id="38c"></td> \
        </tr>\
        \
    </table>\
    \
    <br>\
    <label>Debug output : </label><br>\
    <textarea rows="6" id="dbg" style="width:100%;">\
    </textarea>\
    </div>';
}

function updateCurrentTeeth()
{
    setTeethOnClick();
    switch (TeethMinor[CurrentTeeth.minor])
    {
        case 'a':
            CurrentTeeth.asObject.m_ProbingDepth.a = CurrentField.value;
            break;
        case 'b':
            CurrentTeeth.asObject.m_ProbingDepth.b = CurrentField.value;
            break;
        case 'c':
            CurrentTeeth.asObject.m_ProbingDepth.c = CurrentField.value;
            break;
        default:break;
    }
    CurrentTeeth.asObject.draw();
}

function addInputEvListeners()
{
    for (var i = 0 ; i < TeethMajor.length ; ++i)
    {
        for (var k = 0 ; k < 3 ; ++k)
        {
            var e = document.getElementById(TeethMajor[i] + TeethMinor[k]);
            e.addEventListener('focus', setTeethOnClick.bind(), false);
            e.addEventListener('change', updateCurrentTeeth.bind(), false);
        }
    }
}