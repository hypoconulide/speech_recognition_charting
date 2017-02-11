/* =========================================================================================================
 * Author : Philippe BACHOUR
 * 
 * 
 * 
 * ========================================================================================================= */


/** GLOBAL VARIABLES_________________________________________________________________________________ **/

var TeethMajor = [
    "18", "17", "16", "15", "14", "13", "12", "11", "21", "22", "23", "24", "25", "26", "27", "28",
    "48", "47", "46", "45", "44", "43", "42", "41", "31", "32", "33", "34", "35", "36", "37", "38"
];
var TeethMinor = [
    "a", "b", "c"
];
var TeethFace = [
	"", "L"
];


/**===================================================================================================*/

class ChartRenderer
{
	constructor(arc)
	{
		this.Teeth = new Array(16);
		this.leftToLoad = 64;
		this.Canvas;
		this.Context;
		this.Arc = arc;
	}
	
	initialise()
	{
		switch (this.Arc) // image loading
		{
			case 'upper':
			{
				this.Canvas = document.getElementById('vrc_display0');
				this.Context = this.Canvas.getContext('2d');
				
				var m_CellWidth = this.Canvas.width / 16;
				var m_CellHeight = this.Canvas.height / 2;
				
				for (var i = 11 ; i < 19 ; i++)
				{
					this.Teeth[i - 11] = new Teeth(i, m_CellWidth * - (i - 18), 0);
					
					this.Teeth[i - 11].m_ImgFront.src = "https://github.com/philippe-bachour/resources/raw/master/Dentistry/teeth/" + i + ".png";
					this.Teeth[i - 11].m_ImgLing.src = "https://github.com/philippe-bachour/resources/raw/master/Dentistry/teeth/" + i + "_L.png";
					this.Teeth[i - 11].m_ImgFront.onload = this.checkLoadState.bind(this);
					this.Teeth[i - 11].m_ImgLing.onload = this.checkLoadState.bind(this);
				}
				for (var i = 21 ; i < 29 ; i++)
				{
					this.Teeth[i - 13] = new Teeth(i, m_CellWidth * (i-13), 0);
					
					this.Teeth[i - 13].m_ImgFront.src = "https://github.com/philippe-bachour/resources/raw/master/Dentistry/teeth/" + i + ".png";
					this.Teeth[i - 13].m_ImgLing.src = "https://github.com/philippe-bachour/resources/raw/master/Dentistry/teeth/" + i + "_L.png";
					this.Teeth[i - 13].m_ImgFront.onload = this.checkLoadState.bind(this); 
					this.Teeth[i - 13].m_ImgLing.onload = this.checkLoadState.bind(this); 
				}
				break;
			}
			case 'lower':
			{
				this.Canvas = document.getElementById('vrc_display1');
				this.Context = this.Canvas.getContext('2d');
				
				var m_CellWidth = this.Canvas.width / 16;
				var m_CellHeight = this.Canvas.height / 2;
				
				for (var i = 41 ; i < 49 ; i++)
				{
					this.Teeth[i - 41] = new Teeth(i, m_CellWidth * -(i - 48), 0);

					this.Teeth[i - 41].m_ImgFront.src = "https://github.com/philippe-bachour/resources/raw/master/Dentistry/teeth/" + i + ".png";
					this.Teeth[i - 41].m_ImgLing.src = "https://github.com/philippe-bachour/resources/raw/master/Dentistry/teeth/" + i + "_L.png";
					this.Teeth[i - 41].m_ImgFront.onload = this.checkLoadState.bind(this);
					this.Teeth[i - 41].m_ImgLing.onload = this.checkLoadState.bind(this);
				}
				for (var i = 31 ; i < 39 ; i++)
				{
					this.Teeth[i - 23] = new Teeth(i, m_CellWidth * (i-23), 0);
					
					this.Teeth[i - 23].m_ImgFront.src = "https://github.com/philippe-bachour/resources/raw/master/Dentistry/teeth/" + i + ".png"; 
					this.Teeth[i - 23].m_ImgLing.src = "https://github.com/philippe-bachour/resources/raw/master/Dentistry/teeth/" + i + "_L.png"; 
					this.Teeth[i - 23].m_ImgFront.onload = this.checkLoadState.bind(this); 
					this.Teeth[i - 23].m_ImgLing.onload = this.checkLoadState.bind(this); 
				}
				break;
			}
			default:break;
		}
		
		
		this.Canvas.width = 1632;
		this.Canvas.height = 478;
	}
	
	checkLoadState()
	{
		--this.leftToLoad;
		if (this.leftToLoad == 0)
		{
			this.drawBackground();
		}
	}
	
	drawBackground()
	{
		this.Context.fillStyle="#353535";
        this.Context.clearRect(0, 0, this.Canvas.width, this.Canvas.height);
        
		for (var i = 7 ; i >=0 ; i--)
		{
			this.Teeth[i].draw(this.Context);
		}
		for (var i = 8 ; i < this.Teeth.length ; ++i)
        {
            this.Teeth[i].draw(this.Context);
        }
	}
}


class Teeth
{
	constructor(id, posx, posy)
    {
		this.m_Exists = true;
		this.Id = id;
		
		this.m_ProbingDepth = { a:0 , b:0 , c:0 };
		this.m_ProbingDepthL = { a:0 , b:0 , c:0 };
		this.m_GingivalMargin = { a:0 , b:0 , c:0 };
		this.m_GingivalMarginL = { a:0 , b:0 , c:0 };
		
		this.m_ImgFront = new Image();
		this.m_ImgLing = new Image();
		this.m_Rect = { x:posx, y:posy, w:102, h:239 };
	}
    
    
    draw(ctx, view)
    {
        ctx.clearRect(this.m_Rect.x, this.m_Rect.y, this.m_Rect.w, this.m_Rect.h * 2);
        var offset = 105;
        var sign = -1;
        if (this.Id > 30)
        {
            offset = 135;
            sign = 1;
        }
		if (this.m_Exists)
        {
			// draw images
            ctx.drawImage(this.m_ImgFront, this.m_Rect.x, this.m_Rect.y);
			ctx.drawImage(this.m_ImgLing, this.m_Rect.x, this.m_Rect.y + this.m_Rect.h);
            
			/*--------------------FRONT VIEW------------------------*/
			ctx.beginPath();
			if (this.Id == 18 || this.Id == 48 || !speech_ctl.Charting.getPrevTeeth(this.Id).m_Exists)
            {
                ctx.moveTo(this.m_Rect.x + this.m_Rect.w / 4, (this.m_Rect.y + this.m_Rect.h - offset) + 
					sign * this.m_GingivalMargin.a * speech_ctl.Charting.HEIGHT_STEP);
            }
            else
            {
                var pt = speech_ctl.Charting.getPrevTeeth(this.Id);
                ctx.moveTo(pt.m_Rect.x + pt.m_Rect.w * 3 / 4, (pt.m_Rect.y + pt.m_Rect.h - offset) + 
					sign * pt.m_GingivalMargin.c * speech_ctl.Charting.HEIGHT_STEP);
                ctx.lineTo(this.m_Rect.x + this.m_Rect.w / 4, (this.m_Rect.y + this.m_Rect.h - offset) + 
					sign * this.m_GingivalMargin.a * speech_ctl.Charting.HEIGHT_STEP);
            }
            ctx.lineTo(this.m_Rect.x + this.m_Rect.w / 2, (this.m_Rect.y + this.m_Rect.h - offset) + 	
				sign * this.m_GingivalMargin.b * speech_ctl.Charting.HEIGHT_STEP);
            ctx.lineTo(this.m_Rect.x + this.m_Rect.w * 3 / 4, (this.m_Rect.y + this.m_Rect.h - offset) + 
				sign * this.m_GingivalMargin.c * speech_ctl.Charting.HEIGHT_STEP);
			
			ctx.lineWidth = 2;
            ctx.strokeStyle = speech_ctl.Charting.GMColor;
            ctx.stroke();
			
			ctx.beginPath();
            if (this.Id == 18 || this.Id == 48 || !speech_ctl.Charting.getPrevTeeth(this.Id).m_Exists)
            {
                ctx.moveTo(this.m_Rect.x + this.m_Rect.w / 4, (this.m_Rect.y + this.m_Rect.h - offset) + 
					sign * this.m_ProbingDepth.a * speech_ctl.Charting.HEIGHT_STEP);
            }
            else
            {
                var pt = speech_ctl.Charting.getPrevTeeth(this.Id);
                ctx.moveTo(pt.m_Rect.x + pt.m_Rect.w * 3 / 4, (pt.m_Rect.y + pt.m_Rect.h - offset) + 
					sign * pt.m_ProbingDepth.c * speech_ctl.Charting.HEIGHT_STEP);
                ctx.lineTo(this.m_Rect.x + this.m_Rect.w / 4, (this.m_Rect.y + this.m_Rect.h - offset) + 
					sign * this.m_ProbingDepth.a * speech_ctl.Charting.HEIGHT_STEP);
            }
            ctx.lineTo(this.m_Rect.x + this.m_Rect.w / 2, (this.m_Rect.y + this.m_Rect.h - offset) + 	
				sign * this.m_ProbingDepth.b * speech_ctl.Charting.HEIGHT_STEP);
            ctx.lineTo(this.m_Rect.x + this.m_Rect.w * 3 / 4, (this.m_Rect.y + this.m_Rect.h - offset) + 
				sign * this.m_ProbingDepth.c * speech_ctl.Charting.HEIGHT_STEP);
			
			ctx.lineWidth = 2;
            ctx.strokeStyle = speech_ctl.Charting.PDColor;
            ctx.stroke();
			
			
			/*--------------------BACK VIEW------------------------*/
			ctx.beginPath();
			if (this.Id == 18 || this.Id == 48 || !speech_ctl.Charting.getPrevTeeth(this.Id).m_Exists)
            {
                ctx.moveTo(this.m_Rect.x + this.m_Rect.w / 4, (this.m_Rect.y + this.m_Rect.h*2 - offset) + 
					sign * this.m_GingivalMarginL.a * speech_ctl.Charting.HEIGHT_STEP);
            }
            else
            {
                var pt = speech_ctl.Charting.getPrevTeeth(this.Id);
                ctx.moveTo(pt.m_Rect.x + pt.m_Rect.w * 3 / 4, (pt.m_Rect.y + pt.m_Rect.h*2 - offset) + 
					sign * pt.m_GingivalMarginL.c * speech_ctl.Charting.HEIGHT_STEP);
                ctx.lineTo(this.m_Rect.x + this.m_Rect.w / 4, (this.m_Rect.y + this.m_Rect.h*2 - offset) + 
					sign * this.m_GingivalMarginL.a * speech_ctl.Charting.HEIGHT_STEP);
            }
            ctx.lineTo(this.m_Rect.x + this.m_Rect.w / 2, (this.m_Rect.y + this.m_Rect.h*2 - offset) + 
				sign * this.m_GingivalMarginL.b * speech_ctl.Charting.HEIGHT_STEP);
            ctx.lineTo(this.m_Rect.x + this.m_Rect.w * 3 / 4, (this.m_Rect.y + this.m_Rect.h*2 - offset) + 
				sign * this.m_GingivalMarginL.c * speech_ctl.Charting.HEIGHT_STEP);
			
			ctx.lineWidth = 2;
            ctx.strokeStyle = speech_ctl.Charting.GMColor;
            ctx.stroke();
			
			ctx.beginPath();
			if (this.Id == 18 || this.Id == 48 || !speech_ctl.Charting.getPrevTeeth(this.Id).m_Exists)
            {
                ctx.moveTo(this.m_Rect.x + this.m_Rect.w / 4, (this.m_Rect.y + this.m_Rect.h*2 - offset) + 
					sign * this.m_ProbingDepthL.a * speech_ctl.Charting.HEIGHT_STEP);
            }
            else
            {
                var pt = speech_ctl.Charting.getPrevTeeth(this.Id);
                ctx.moveTo(pt.m_Rect.x + pt.m_Rect.w * 3 / 4, (pt.m_Rect.y + pt.m_Rect.h*2 - offset) + 
					sign * pt.m_ProbingDepthL.c * speech_ctl.Charting.HEIGHT_STEP);
                ctx.lineTo(this.m_Rect.x + this.m_Rect.w / 4, (this.m_Rect.y + this.m_Rect.h*2 - offset) + 
					sign * this.m_ProbingDepthL.a * speech_ctl.Charting.HEIGHT_STEP);
            }
            ctx.lineTo(this.m_Rect.x + this.m_Rect.w / 2, (this.m_Rect.y + this.m_Rect.h*2 - offset) + 
				sign * this.m_ProbingDepthL.b * speech_ctl.Charting.HEIGHT_STEP);
            ctx.lineTo(this.m_Rect.x + this.m_Rect.w * 3 / 4, (this.m_Rect.y + this.m_Rect.h*2 - offset) + 
				sign * this.m_ProbingDepthL.c * speech_ctl.Charting.HEIGHT_STEP);
			
			ctx.lineWidth = 2;
            ctx.strokeStyle = speech_ctl.Charting.PDColor;
            ctx.stroke();
        }
    }
}

var dbg;

class Charting
{
	constructor()
	{
		this.Maxilla = new ChartRenderer('upper');
		this.Mandibula = new ChartRenderer('lower');
		this.CurrentTeeth = {major:0,minor:0,face:0,asObject:-1};
		this.CurrentField;
		this.HEIGHT_STEP = 5; // px Y step offset
		this.GMColor = 'green';
		this.PDColor = 'red';
	}
	
	initialise()
	{
		this.Mandibula.initialise();
		this.Maxilla.initialise();
		//this.getCurrentField();
		this.addInputEvListeners();
	}
	
	getTeethById(id)
	{
		for (var i = 0 ; i < this.Maxilla.Teeth.length ; ++i)
		{
			if (this.Maxilla.Teeth[i].Id == id) return this.Maxilla.Teeth[i];
			if (this.Mandibula.Teeth[i].Id == id) return this.Mandibula.Teeth[i];
		}
	}

	getPrevTeeth(id)
	{
		if (id < 18 && id > 10)
			return this.getTeethById(id + 1);
		else if (id > 21 && id < 29)
			return this.getTeethById(id - 1);
		else if (id < 48 && id > 40)
			return this.getTeethById(id + 1)
		else if (id > 31 && id < 39)
			return this.getTeethById(id - 1);
		else if (id == 21) return this.getTeethById(11);
		else if (id == 31) return this.getTeethById(41);
		else alert('big problem');
	}

	getNextTeeth()
	{
		this.CurrentTeeth.minor++;
		
		if (this.CurrentTeeth.minor == 3)
		{
			this.CurrentTeeth.minor = 0;
			
			if (TeethMajor[this.CurrentTeeth.major] == "28" || TeethMajor[this.CurrentTeeth.major] == "38") 
			{
				if (this.CurrentTeeth.face == 0)
				{
					this.CurrentTeeth.major -= 15;
					this.CurrentTeeth.face = 1;
				}
				else
				{
					this.CurrentTeeth.major++;
				}
			}
			else this.CurrentTeeth.major++;
			
			if (this.CurrentTeeth.major == TeethMajor.length)
				this.CurrentTeeth.major = 0;
		}
	}
	
	getCurrentField()
	{
		this.CurrentField = document.getElementById(TeethMajor[this.CurrentTeeth.major] + 
			TeethFace[this.CurrentTeeth.face] +
			TeethMinor[this.CurrentTeeth.minor]);
		this.CurrentField.focus();    
	}

	getCurrentToothAsObject()
	{
		for (var i = 0 ; i < 32 ; ++i)
		{
			var n = parseInt(this.CurrentField.id.substr(0, 2));
			if (this.Mandibula.Teeth[i].Id == n)
			{
				this.CurrentTeeth.asObject = this.Mandibula.Teeth[i];
				break;
			}
			else if (this.Maxilla.Teeth[i].Id == n)
			{
				this.CurrentTeeth.asObject = this.Maxilla.Teeth[i];
				break;
			}
		}
	}
	
	drawTooth(id = -1)
	{
		if (id == -1)
		{
			if(this.CurrentTeeth.asObject.Id > 30)
				this.CurrentTeeth.asObject.draw(this.Mandibula.Context);
			else this.CurrentTeeth.asObject.draw(this.Maxilla.Context);
			return;
		}
		var t = this.getTeethById(id);
		if (t.Id > 30)
			t.draw(this.Mandibula.Context);
		else t.draw(this.Maxilla.Context);
	}
	
	setTeethOnClick()
	{
		var s = document.activeElement.id.substr(0, 2);
		for (var i = 0 ; i < 32 ; ++i)
			if (s == TeethMajor[i])
			{
				this.CurrentTeeth.major = i;
				break;
			}
		switch (document.activeElement.id.substr(2, 1))
		{
			case 'L' :
			{
				this.CurrentTeeth.face = 1;
				switch(document.activeElement.id.substr(3, 1))
				{
					case 'a' :
						this.CurrentTeeth.minor = 0;
						break;
					case 'b' :
						this.CurrentTeeth.minor = 1;
						break;
					case 'c' :
						this.CurrentTeeth.minor = 2;
						break;
				}
				break;
			}
			case 'a' :
				this.CurrentTeeth.minor = 0;
				this.CurrentTeeth.face = 0;
				break;
			case 'b' :
				this.CurrentTeeth.minor = 1;
				this.CurrentTeeth.face = 0;
				break;
			case 'c' :		
				this.CurrentTeeth.minor = 2;
				this.CurrentTeeth.face = 0;
				break;
		}
		this.CurrentField = document.getElementById(TeethMajor[this.CurrentTeeth.major] + TeethFace[this.CurrentTeeth.face] + TeethMinor[this.CurrentTeeth.minor]);
		this.getCurrentToothAsObject();
	}
	
	setCurrentToothValue(value)
	{
		var target = (this.CurrentTeeth.face ? 
			this.CurrentTeeth.asObject.m_ProbingDepthL : this.CurrentTeeth.asObject.m_ProbingDepth);
		
		switch(TeethMinor[this.CurrentTeeth.minor])
		{
			case 'a':
				target.a = this.CurrentField.value;
				break;
			case 'b':
				target.b = this.CurrentField.value;
				break;
			case 'c':
				target.c = this.CurrentField.value;
				break;
			default:break;
		}	
		this.drawTooth();
	}
	
	updateCurrentTeeth()
	{
		this.setTeethOnClick();
		switch (TeethMinor[this.CurrentTeeth.minor])
		{
			case 'a':
				if (this.CurrentTeeth.face)
					this.CurrentTeeth.asObject.m_ProbingDepthL.a = parseInt(this.CurrentField.value);
				else this.CurrentTeeth.asObject.m_ProbingDepth.a = parseInt(this.CurrentField.value);
				break;
			case 'b':
				if (this.CurrentTeeth.face)
					this.CurrentTeeth.asObject.m_ProbingDepthL.b = parseInt(this.CurrentField.value);
				else this.CurrentTeeth.asObject.m_ProbingDepth.b = parseInt(this.CurrentField.value);
				break;
			case 'c':
				if (this.CurrentTeeth.face)
					this.CurrentTeeth.asObject.m_ProbingDepthL.c = parseInt(this.CurrentField.value);
				else this.CurrentTeeth.asObject.m_ProbingDepth.c = parseInt(this.CurrentField.value);
				break;
			default:break;
		}
		this.drawTooth();
	}

	addInputEvListeners()
	{
		for (var i = 0 ; i < TeethMajor.length ; ++i)
		{
			for (var k = 0 ; k < 3 ; ++k)
			{
				var e = document.getElementById(TeethMajor[i] + TeethMinor[k]);
				e.addEventListener('focus', this.setTeethOnClick.bind(this), false);
				e.addEventListener('change', this.updateCurrentTeeth.bind(this), false);
				
				e = document.getElementById(TeethMajor[i] + 'L' + TeethMinor[k]);
				e.addEventListener('focus', this.setTeethOnClick.bind(this), false);
				e.addEventListener('change', this.updateCurrentTeeth.bind(this), false);
			}
		}
	}
}

class SpeechController
{
	constructor()
	{
		this.DICTIONNARY = { Missing:'' , StopReco:'' , Tooth:'' };
		this.final_transcript = '';
		this.Recognition = 0;
		this.Charting = 0;
	}
	
	initialise()
	{
		generatePageContent();
		
		document.getElementById('refresh_bt').addEventListener("click", 
			function(){
				speech_ctl.Charting.Maxilla.drawBackground();
				speech_ctl.Charting.Mandibula.drawBackground();
			}, 
			false);
		
		this.Charting = new Charting();
		this.setLanguage(document.getElementById('lang').value);
		this.Charting.initialise();
		
		/* Generate tables, and buttons event listeners */
		dbg = document.getElementById('dbg')
		
		document.getElementById('StartBut').addEventListener("click", this.startRecognition.bind(this), false);
		document.getElementById('StopBut').addEventListener("click", this.stopRecognition.bind(this), false);
		
		/* Initialise SpeechRecognition */
		
		if (!('webkitSpeechRecognition' in window))
		{
			printf("Speech API not supported by your browser, you must use Chrome version 25 or later.");
		}
		else
		{
			/* Grammar rules, not implemented yet in Chrome */
			/*
			var numbers = [ '0' , '1' , '2', '3', '4', '5', '6', '7', '8' , '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21' ];
			var grammar = '#JSGF V1.0; grammar numbers; public <numbers> = ' + numbers.join(' | ') + ' ;' ;
			
			var g_rules = new webkitSpeechGrammarList();
			g_rules.addFromString(grammar, 1);
			*/
			
			this.Recognition = new webkitSpeechRecognition();
			this.Recognition.continuous = true;
			this.Recognition.interimResults = false;
			
			//recognition.grammars = g_rules;
			
			this.Recognition.onstart = function()
			{
				var str = TeethMajor[this.Charting.CurrentTeeth.major];
				switch (this.Charting.CurrentTeeth.minor)
				{
					case 0:
						(this.Charting.CurrentTeeth.asObject.Id < 40 && this.Charting.CurrentTeeth.asObject.Id > 20) ? str += ' mesial' : str += ' distal';
						break;
					case 1:
						str += ' median';
						break;
					case 2:
						(this.Charting.CurrentTeeth.asObject.Id < 40 && this.Charting.CurrentTeeth.asObject.Id > 20) ? str += ' distal' : str += ' mesial';
						break;
					default:break;
				}
				printf("Starting from " + str);
			}.bind(this);
			this.Recognition.onresult = function(event)
			{
				for (var i = event.resultIndex ; i < event.results.length ; ++i)
				{
					if (event.results[i][0].transcript.includes(this.DICTIONNARY.StopReco))
					{
						this.Recognition.stop();
						printf("End of recognition.\n");
					}
					else if (event.results[i][0].transcript.includes(this.DICTIONNARY.Tooth))
					{
						
					}
					else if (event.results[i][0].transcript.includes(this.DICTIONNARY.Missing))
					{
						var sv = this.Charting.CurrentTeeth.face;
						
						document.getElementById(TeethMajor[this.Charting.CurrentTeeth.major] + 'a').value = 0;
						document.getElementById(TeethMajor[this.Charting.CurrentTeeth.major] + 'b').value = 0;
						document.getElementById(TeethMajor[this.Charting.CurrentTeeth.major] + 'c').value = 0;
						document.getElementById(TeethMajor[this.Charting.CurrentTeeth.major] + 'La').value = 0;
						document.getElementById(TeethMajor[this.Charting.CurrentTeeth.major] + 'Lb').value = 0;
						document.getElementById(TeethMajor[this.Charting.CurrentTeeth.major] + 'Lc').value = 0;
						
						this.Charting.CurrentTeeth.face = sv;
						this.Charting.CurrentTeeth.minor = 2;
						
						this.Charting.CurrentTeeth.asObject.m_Exists = false;
						this.Charting.drawTooth();
						
						this.Charting.getNextTeeth();
						this.Charting.getCurrentField();
						this.Charting.getCurrentToothAsObject();
					}
					else if(!isNaN(parseInt(event.results[i][0].transcript)) || 
							event.results[i][0].transcript.includes("un") ||
							event.results[i][0].transcript.includes("de"))
					{
						if (event.results[i][0].transcript.includes("un"))
						{
							this.Charting.CurrentField.value = 1;
							this.Charting.setCurrentToothValue(1);
						}
						else if (event.results[i][0].transcript.includes("de"))
						{
							this.Charting.CurrentField.value = 2;
							this.Charting.setCurrentToothValue(2);
						}
						else
						{
							this.Charting.CurrentField.value = parseInt(event.results[i][0].transcript);
							this.Charting.setCurrentToothValue(parseInt(event.results[i][0].transcript));
						}
						this.Charting.drawTooth();
						printf("Found teeth with ID : " + this.Charting.CurrentTeeth.asObject.Id + " for " + TeethMajor[this.Charting.CurrentTeeth.major] + " filling " + this.Charting.CurrentField.id + '\n');
						this.Charting.getNextTeeth();
						this.Charting.getCurrentField();
						this.Charting.getCurrentToothAsObject();
					}
					else
						printf("Unknown transcript : " + event.results[i][0].transcript);
				}
			}.bind(this);
			this.Recognition.onnomatch = function(event)
			{
				printf('No command string matching what you said.\n');
			}.bind(this);
			this.Recognition.onerror = function(event) 
			{
			
			}.bind(this);
			this.Recognition.onend = function()
			{
			
			}.bind(this);
		}
	}
	
	setLanguage(lang)
	{
		switch(lang)
		{
			case 'fr-FR':
				this.DICTIONNARY.Missing = ('absente');
				this.DICTIONNARY.StopReco = ('stop');
				this.DICTIONNARY.Tooth = ('dent');
				break;
			case 'en-US':
				this.DICTIONNARY.Missing = ('missing');
				this.DICTIONNARY.StopReco = ('stop');
				this.DICTIONNARY.Tooth = ('tooth');
				break;
			default:break;
		}
	}
	
	startRecognition(event)
	{
		printf("Recognition started :\n");
		this.final_transcript = '';
		this.Recognition.lang = document.getElementById('lang').value;
		this.setLanguage(this.Recognition.lang);
		document.getElementById('rec_icon').src = "https://github.com/philippe-bachour/vr_charting/icons/ic_settings_voice_red_24dp_2x.png";

		if (!this.Charting.CurrentField) this.Charting.getCurrentField();
		else this.Charting.CurrentField.focus();
		this.Charting.getCurrentToothAsObject();
		this.Recognition.start();
	}
	stopRecognition()
	{
		document.getElementById('rec_icon').src = "https://github.com/philippe-bachour/vr_charting/icons/ic_settings_voice_black_24dp_2x.png";
		this.Recognition.stop();
	}
	
	
}

/** _________________________________________________________________________________________________ **/

/* Init */

var speech_ctl = new SpeechController();
speech_ctl.initialise();
speech_ctl.Charting.initialise();

//startup();


function startup()
{    
    generatePageContent();
    dbg = document.getElementById('dbg')
    
    if (!('webkitSpeechRecognition' in window))
    {
        printf("Speech API not supported by your browser, you must use Chrome version 25 or later.");
    }
    else
    {
        /* Grammar rules, not implemented yet in Chrome */
        /*
        var numbers = [ '0' , '1' , '2', '3', '4', '5', '6', '7', '8' , '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21' ];
        var grammar = '#JSGF V1.0; grammar numbers; public <numbers> = ' + numbers.join(' | ') + ' ;' ;
        
        var g_rules = new webkitSpeechGrammarList();
        g_rules.addFromString(grammar, 1);
        */
        
        recognition = new webkitSpeechRecognition();
        recognition.continuous = true;
        recognition.interimResults = false;
        
        //recognition.grammars = g_rules;
        
        recognition.onstart = function()
        {
            var str = TeethMajor[CurrentTeeth.major];
            switch (CurrentTeeth.minor)
            {
                case 0:
                    (CurrentTeeth.asObject.Id < 40 && CurrentTeeth.asObject.Id > 20) ? str += ' mesial' : str += ' distal';
                    break;
                case 1:
                    str += ' median';
                    break;
                case 2:
                    (CurrentTeeth.asObject.Id < 40 && CurrentTeeth.asObject.Id > 20) ? str += ' distal' : str += ' mesial';
                    break;
                default:break;
            }
            printf("Starting from " + str);
        };
        this.Recognition.onresult = function(event)
        {
            for (var i = event.resultIndex ; i < event.results.length ; ++i)
            {
                if (event.results[i][0].transcript.includes(this.DICTIONNARY.StopReco))
                {
                    this.Recognition.stop();
                    printf("End of recognition.\n");
                }
                else if (event.results[i][0].transcript.includes(this.DICTIONNARY.Tooth))
                {
                    
                }
                else if (event.results[i][0].transcript.includes(this.DICTIONNARY.Missing))
                {
                    this.CurrentTeeth.minor = 0;
                    getCurrentField();
                    this.CurrentField.value = 0;
                    
                    this.CurrentTeeth.minor = 1;
                    getCurrentField();
                    this.CurrentField.value = 0;
                    
                    this.CurrentTeeth.minor = 2;
                    getCurrentField();
                    this.CurrentField.value = 0;
                    
                    this.CurrentTeeth.asObject.m_Exists = false;
                    this.Charting.drawTooth();
                    
                    this.Charting.getNextTeeth();
                    this.Charting.getCurrentField();
                    this.Charting.getCurrentToothAsObject();
                }
                else if(parseInt(event.results[i][0].transcript) || event.results[i][0].transcript.includes("un"))
                {
                    if (event.results[i][0].transcript.includes("un"))
                    {
                        this.CurrentField.value = 1;
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
                        this.CurrentField.value = parseInt(event.results[i][0].transcript);
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
                    this.drawTooth();
                    printf("Found teeth with ID : " + CurrentTeeth.asObject.Id + " for " + TeethMajor[CurrentTeeth.major] + " filling " + this.CurrentField.id + '\n');
                    getNextTeeth();
                    getCurrentField();
                    getCurrentToothAsObject();
                }
                else
                    printf("Unknown transcript : " + event.results[i][0].transcript);
            }
        };
        this.Recognition.onnomatch = function(event)
        {
            printf('No command string matching what you said.\n');
        }
        this.Recognition.onerror = function(event) 
        {
        
        };
        this.Recognition.onend = function()
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


function generatePageContent()
{
    document.getElementById('vr_charting').innerHTML = '<div class="no-print">Commandes vocales :<br>\
    <ul>\
        <li>"stop" : arrêter la reconnaissance</li>\
        <li>"absente" : dent absente</li>\
        <li>dites un nombre pour remplir la case ayant le focus</li>\
    </ul>\
    <p>Vous pouvez également entrer des valeurs directement dans les champs au clavier</p>\
    <p>Cliquez sur un input pour définir la case de départ</p>\
	</div>\
	<div style="display:flex;flex-direction:column;max-width:calc(100vw - 17px);">\
		<div class="chart_title">Charting Parodontal</div>\
		<div class="flex_col" style="width:100%;align-items: center;">\
			<table class="pdata_container">\
				<tr>\
					<td><label for="pFirstName">Nom : </label></td><td><input id="pFirstName" type="text"></td>\
					<td><label for="pLastName">Prénom : </label></td><td><input id="pLastName" type="text"></td>\
					<td><label for="pBirthDate">Date de naissance : </label></td><td><input id="pBirthDate" type="text"></td>\
				</tr>\
				<tr>\
					<td><label for="pClinician">Praticien : </label></td><td><input id="pClinician" type="text"></td>\
					<td><label for="pDate">Date : </label></td><td><input id="pDate" type="text"></td>\
				</tr>\
			</table><!--\
			<div class="flex_row space_around">\
				<div><label for="pFirstName">First name : </label><input id="pFirstName" type="text"></div>\
				<div><label for="pLastName">Last name : </label><input id="pLastName" type="text"></div>\
				<div><label for="pBirthDate">Birthdate : </label><input id="pBirthDate" type="text"></div>\
			</div>\
			<div class="flex_row space_around">\
				<div><label for="pClinician">Clinician : </label><input id="pClinician" type="text"></div>\
				<div><label for="pDate">Date : </label><input id="pDate" type="text"></div>\
			</div>-->\
		</div>\
		<p style="text-align:center;" class="no-print">\
			<span><img id="rec_icon" style="height:32px" src="icons/ic_settings_voice_black_24dp_2x.png"></span>\
			<input type="button" value="Démarrer" id="StartBut">\
			<input type="button" value="Arrêter" id="StopBut"> \
			<input type="button" value="Rafraîchir" id="refresh_bt">\
			<select style="display:none;" id="lang">\
				<option value="fr-FR" selected>Français</option>\
				<option value="en-US">English</option>\
			</select> \
		</p>\
		<table class="table"> \
			<tr class="table_title teeth_num"> \
				<td></td>\
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
			<tr>\
				<td class="table_title row_title">Mobilité</td>\
				<td colspan="3"><input id="mob18" type="text" value="0"></td>\
				<td colspan="3"><input id="mob17" type="text" value="0"></td>\
				<td colspan="3"><input id="mob16" type="text" value="0"></td>\
				<td colspan="3"><input id="mob15" type="text" value="0"></td>\
				<td colspan="3"><input id="mob14" type="text" value="0"></td>\
				<td colspan="3"><input id="mob13" type="text" value="0"></td>\
				<td colspan="3"><input id="mob12" type="text" value="0"></td>\
				<td colspan="3"><input id="mob11" type="text" value="0"></td>\
				<td colspan="3"><input id="mob21" type="text" value="0"></td>\
				<td colspan="3"><input id="mob22" type="text" value="0"></td>\
				<td colspan="3"><input id="mob23" type="text" value="0"></td>\
				<td colspan="3"><input id="mob24" type="text" value="0"></td>\
				<td colspan="3"><input id="mob25" type="text" value="0"></td>\
				<td colspan="3"><input id="mob26" type="text" value="0"></td>\
				<td colspan="3"><input id="mob27" type="text" value="0"></td>\
				<td colspan="3"><input id="mob28" type="text" value="0"></td>\
			</tr>\
			<tr>\
				<td class="table_title row_title">Implant</td>\
				<td colspan="3"><input id="impl18" type="checkbox"/></td>\
				<td colspan="3"><input id="impl17" type="checkbox"/></td>\
				<td colspan="3"><input id="impl16" type="checkbox"/></td>\
				<td colspan="3"><input id="impl15" type="checkbox"/></td>\
				<td colspan="3"><input id="impl14" type="checkbox"/></td>\
				<td colspan="3"><input id="impl13" type="checkbox"/></td>\
				<td colspan="3"><input id="impl12" type="checkbox"/></td>\
				<td colspan="3"><input id="impl11" type="checkbox"/></td>\
				<td colspan="3"><input id="impl21" type="checkbox"/></td>\
				<td colspan="3"><input id="impl22" type="checkbox"/></td>\
				<td colspan="3"><input id="impl23" type="checkbox"/></td>\
				<td colspan="3"><input id="impl24" type="checkbox"/></td>\
				<td colspan="3"><input id="impl25" type="checkbox"/></td>\
				<td colspan="3"><input id="impl26" type="checkbox"/></td>\
				<td colspan="3"><input id="impl27" type="checkbox"/></td>\
				<td colspan="3"><input id="impl28" type="checkbox"/></td>\
			</tr>\
			<tr class="cb bop">\
				<td class="table_title row_title">Saignement au sondage</td>\
				<td><input id="bop18a" type="checkbox"/><label for="bop18a"></label>\</td>\
				<td><input id="bop18b" type="checkbox"/><label for="bop18b"></label>\</td>\
				<td><input id="bop18c" type="checkbox"/><label for="bop18c"></label>\</td>\
				<td><input id="bop17a" type="checkbox"/><label for="bop17a"></label>\</td>\
				<td><input id="bop17b" type="checkbox"/><label for="bop17b"></label>\</td>\
				<td><input id="bop17c" type="checkbox"/><label for="bop17c"></label>\</td>\
				<td><input id="bop16a" type="checkbox"/><label for="bop16a"></label>\</td>\
				<td><input id="bop16b" type="checkbox"/><label for="bop16b"></label>\</td>\
				<td><input id="bop16c" type="checkbox"/><label for="bop16c"></label>\</td>\
				<td><input id="bop15a" type="checkbox"/><label for="bop15a"></label>\</td>\
				<td><input id="bop15b" type="checkbox"/><label for="bop15b"></label>\</td>\
				<td><input id="bop15c" type="checkbox"/><label for="bop15c"></label>\</td>\
				<td><input id="bop14a" type="checkbox"/><label for="bop14a"></label>\</td>\
				<td><input id="bop14b" type="checkbox"/><label for="bop14b"></label>\</td>\
				<td><input id="bop14c" type="checkbox"/><label for="bop14c"></label>\</td>\
				<td><input id="bop13a" type="checkbox"/><label for="bop13a"></label>\</td>\
				<td><input id="bop13b" type="checkbox"/><label for="bop13b"></label>\</td>\
				<td><input id="bop13c" type="checkbox"/><label for="bop13c"></label>\</td>\
				<td><input id="bop12a" type="checkbox"/><label for="bop12a"></label>\</td>\
				<td><input id="bop12b" type="checkbox"/><label for="bop12b"></label>\</td>\
				<td><input id="bop12c" type="checkbox"/><label for="bop12c"></label>\</td>\
				<td><input id="bop11a" type="checkbox"/><label for="bop11a"></label>\</td>\
				<td><input id="bop11b" type="checkbox"/><label for="bop11b"></label>\</td>\
				<td><input id="bop11c" type="checkbox"/><label for="bop11c"></label>\</td>\
				<td><input id="bop21a" type="checkbox"/><label for="bop21a"></label>\</td>\
				<td><input id="bop21b" type="checkbox"/><label for="bop21b"></label>\</td>\
				<td><input id="bop21c" type="checkbox"/><label for="bop21c"></label>\</td>\
				<td><input id="bop22a" type="checkbox"/><label for="bop22a"></label>\</td>\
				<td><input id="bop22b" type="checkbox"/><label for="bop22b"></label>\</td>\
				<td><input id="bop22c" type="checkbox"/><label for="bop22c"></label>\</td>\
				<td><input id="bop23a" type="checkbox"/><label for="bop23a"></label>\</td>\
				<td><input id="bop23b" type="checkbox"/><label for="bop23b"></label>\</td>\
				<td><input id="bop23c" type="checkbox"/><label for="bop23c"></label>\</td>\
				<td><input id="bop24a" type="checkbox"/><label for="bop24a"></label>\</td>\
				<td><input id="bop24b" type="checkbox"/><label for="bop24b"></label>\</td>\
				<td><input id="bop24c" type="checkbox"/><label for="bop24c"></label>\</td>\
				<td><input id="bop25a" type="checkbox"/><label for="bop25a"></label>\</td>\
				<td><input id="bop25b" type="checkbox"/><label for="bop25b"></label>\</td>\
				<td><input id="bop25c" type="checkbox"/><label for="bop25c"></label>\</td>\
				<td><input id="bop26a" type="checkbox"/><label for="bop26a"></label>\</td>\
				<td><input id="bop26b" type="checkbox"/><label for="bop26b"></label>\</td>\
				<td><input id="bop26c" type="checkbox"/><label for="bop26c"></label>\</td>\
				<td><input id="bop27a" type="checkbox"/><label for="bop27a"></label>\</td>\
				<td><input id="bop27b" type="checkbox"/><label for="bop27b"></label>\</td>\
				<td><input id="bop27c" type="checkbox"/><label for="bop27c"></label>\</td>\
				<td><input id="bop28a" type="checkbox"/><label for="bop28a"></label>\</td>\
				<td><input id="bop28b" type="checkbox"/><label for="bop28b"></label>\</td>\
				<td><input id="bop28c" type="checkbox"/><label for="bop28c"></label>\</td>\
			</tr>\
			<tr class="cb plq">\
				<td class="table_title row_title">Plaque</td>\
				<td><input id="plq18a" type="checkbox"/><label for="plq18a"></label>\</td>\
				<td><input id="plq18b" type="checkbox"/><label for="plq18b"></label>\</td>\
				<td><input id="plq18c" type="checkbox"/><label for="plq18c"></label>\</td>\
				<td><input id="plq17a" type="checkbox"/><label for="plq17a"></label>\</td>\
				<td><input id="plq17b" type="checkbox"/><label for="plq17b"></label>\</td>\
				<td><input id="plq17c" type="checkbox"/><label for="plq17c"></label>\</td>\
				<td><input id="plq16a" type="checkbox"/><label for="plq16a"></label>\</td>\
				<td><input id="plq16b" type="checkbox"/><label for="plq16b"></label>\</td>\
				<td><input id="plq16c" type="checkbox"/><label for="plq16c"></label>\</td>\
				<td><input id="plq15a" type="checkbox"/><label for="plq15a"></label>\</td>\
				<td><input id="plq15b" type="checkbox"/><label for="plq15b"></label>\</td>\
				<td><input id="plq15c" type="checkbox"/><label for="plq15c"></label>\</td>\
				<td><input id="plq14a" type="checkbox"/><label for="plq14a"></label>\</td>\
				<td><input id="plq14b" type="checkbox"/><label for="plq14b"></label>\</td>\
				<td><input id="plq14c" type="checkbox"/><label for="plq14c"></label>\</td>\
				<td><input id="plq13a" type="checkbox"/><label for="plq13a"></label>\</td>\
				<td><input id="plq13b" type="checkbox"/><label for="plq13b"></label>\</td>\
				<td><input id="plq13c" type="checkbox"/><label for="plq13c"></label>\</td>\
				<td><input id="plq12a" type="checkbox"/><label for="plq12a"></label>\</td>\
				<td><input id="plq12b" type="checkbox"/><label for="plq12b"></label>\</td>\
				<td><input id="plq12c" type="checkbox"/><label for="plq12c"></label>\</td>\
				<td><input id="plq11a" type="checkbox"/><label for="plq11a"></label>\</td>\
				<td><input id="plq11b" type="checkbox"/><label for="plq11b"></label>\</td>\
				<td><input id="plq11c" type="checkbox"/><label for="plq11c"></label>\</td>\
				<td><input id="plq21a" type="checkbox"/><label for="plq21a"></label>\</td>\
				<td><input id="plq21b" type="checkbox"/><label for="plq21b"></label>\</td>\
				<td><input id="plq21c" type="checkbox"/><label for="plq21c"></label>\</td>\
				<td><input id="plq22a" type="checkbox"/><label for="plq22a"></label>\</td>\
				<td><input id="plq22b" type="checkbox"/><label for="plq22b"></label>\</td>\
				<td><input id="plq22c" type="checkbox"/><label for="plq22c"></label>\</td>\
				<td><input id="plq23a" type="checkbox"/><label for="plq23a"></label>\</td>\
				<td><input id="plq23b" type="checkbox"/><label for="plq23b"></label>\</td>\
				<td><input id="plq23c" type="checkbox"/><label for="plq23c"></label>\</td>\
				<td><input id="plq24a" type="checkbox"/><label for="plq24a"></label>\</td>\
				<td><input id="plq24b" type="checkbox"/><label for="plq24b"></label>\</td>\
				<td><input id="plq24c" type="checkbox"/><label for="plq24c"></label>\</td>\
				<td><input id="plq25a" type="checkbox"/><label for="plq25a"></label>\</td>\
				<td><input id="plq25b" type="checkbox"/><label for="plq25b"></label>\</td>\
				<td><input id="plq25c" type="checkbox"/><label for="plq25c"></label>\</td>\
				<td><input id="plq26a" type="checkbox"/><label for="plq26a"></label>\</td>\
				<td><input id="plq26b" type="checkbox"/><label for="plq26b"></label>\</td>\
				<td><input id="plq26c" type="checkbox"/><label for="plq26c"></label>\</td>\
				<td><input id="plq27a" type="checkbox"/><label for="plq27a"></label>\</td>\
				<td><input id="plq27b" type="checkbox"/><label for="plq27b"></label>\</td>\
				<td><input id="plq27c" type="checkbox"/><label for="plq27c"></label>\</td>\
				<td><input id="plq28a" type="checkbox"/><label for="plq28a"></label>\</td>\
				<td><input id="plq28b" type="checkbox"/><label for="plq28b"></label>\</td>\
				<td><input id="plq28c" type="checkbox"/><label for="plq28c"></label>\</td>\
			</tr>\
			<tr> \
				<td class="table_title row_title">Niveau gingival</td>\
				<td><input type="text" size="1" id="18Ga"></td> \
				<td><input type="text" size="1" id="18Gb"></td> \
				<td><input type="text" size="1" id="18Gc"></td> \
				<td><input type="text" size="1" id="17Ga"></td> \
				<td><input type="text" size="1" id="17Gb"></td> \
				<td><input type="text" size="1" id="17Gc"></td> \
				<td><input type="text" size="1" id="16Ga"></td> \
				<td><input type="text" size="1" id="16Gb"></td> \
				<td><input type="text" size="1" id="16Gc"></td> \
				<td><input type="text" size="1" id="15Ga"></td> \
				<td><input type="text" size="1" id="15Gb"></td> \
				<td><input type="text" size="1" id="15Gc"></td> \
				<td><input type="text" size="1" id="14Ga"></td> \
				<td><input type="text" size="1" id="14Gb"></td> \
				<td><input type="text" size="1" id="14Gc"></td> \
				<td><input type="text" size="1" id="13Ga"></td> \
				<td><input type="text" size="1" id="13Gb"></td> \
				<td><input type="text" size="1" id="13Gc"></td> \
				<td><input type="text" size="1" id="12Ga"></td> \
				<td><input type="text" size="1" id="12Gb"></td> \
				<td><input type="text" size="1" id="12Gc"></td> \
				<td><input type="text" size="1" id="11Ga"></td> \
				<td><input type="text" size="1" id="11Gb"></td> \
				<td><input type="text" size="1" id="11Gc"></td> \
															   \
				<td><input type="text" size="1" id="21Ga"></td> \
				<td><input type="text" size="1" id="21Gb"></td> \
				<td><input type="text" size="1" id="21Gc"></td> \
				<td><input type="text" size="1" id="22Ga"></td> \
				<td><input type="text" size="1" id="22Gb"></td> \
				<td><input type="text" size="1" id="22Gc"></td> \
				<td><input type="text" size="1" id="23Ga"></td> \
				<td><input type="text" size="1" id="23Gb"></td> \
				<td><input type="text" size="1" id="23Gc"></td> \
				<td><input type="text" size="1" id="24Ga"></td> \
				<td><input type="text" size="1" id="24Gb"></td> \
				<td><input type="text" size="1" id="24Gc"></td> \
				<td><input type="text" size="1" id="25Ga"></td> \
				<td><input type="text" size="1" id="25Gb"></td> \
				<td><input type="text" size="1" id="25Gc"></td> \
				<td><input type="text" size="1" id="26Ga"></td> \
				<td><input type="text" size="1" id="26Gb"></td> \
				<td><input type="text" size="1" id="26Gc"></td> \
				<td><input type="text" size="1" id="27Ga"></td> \
				<td><input type="text" size="1" id="27Gb"></td> \
				<td><input type="text" size="1" id="27Gc"></td> \
				<td><input type="text" size="1" id="28Ga"></td> \
				<td><input type="text" size="1" id="28Gb"></td> \
				<td><input type="text" size="1" id="28Gc"></td> \
			</tr> \
			<tr> \
				<td class="table_title row_title">Profondeur de sondage</td>\
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
				<td class="table_title row_title"></td>\
				<td colspan="48"> \
				<div style="width:100%;"> \
					<canvas id="vrc_display0" style="display:inline-block;max-width:100%;max-height:100%;"></canvas> \
				</div> \
				</td> \
			</tr> \
			\
			<tr> \
				<td class="table_title row_title">Profondeur de sondage</td>\
				<td><input type="text" size="1" id="18La"></td> \
				<td><input type="text" size="1" id="18Lb"></td> \
				<td><input type="text" size="1" id="18Lc"></td> \
				<td><input type="text" size="1" id="17La"></td> \
				<td><input type="text" size="1" id="17Lb"></td> \
				<td><input type="text" size="1" id="17Lc"></td> \
				<td><input type="text" size="1" id="16La"></td> \
				<td><input type="text" size="1" id="16Lb"></td> \
				<td><input type="text" size="1" id="16Lc"></td> \
				<td><input type="text" size="1" id="15La"></td> \
				<td><input type="text" size="1" id="15Lb"></td> \
				<td><input type="text" size="1" id="15Lc"></td> \
				<td><input type="text" size="1" id="14La"></td> \
				<td><input type="text" size="1" id="14Lb"></td> \
				<td><input type="text" size="1" id="14Lc"></td> \
				<td><input type="text" size="1" id="13La"></td> \
				<td><input type="text" size="1" id="13Lb"></td> \
				<td><input type="text" size="1" id="13Lc"></td> \
				<td><input type="text" size="1" id="12La"></td> \
				<td><input type="text" size="1" id="12Lb"></td> \
				<td><input type="text" size="1" id="12Lc"></td> \
				<td><input type="text" size="1" id="11La"></td> \
				<td><input type="text" size="1" id="11Lb"></td> \
				<td><input type="text" size="1" id="11Lc"></td> \
															  \
				<td><input type="text" size="1" id="21La"></td> \
				<td><input type="text" size="1" id="21Lb"></td> \
				<td><input type="text" size="1" id="21Lc"></td> \
				<td><input type="text" size="1" id="22La"></td> \
				<td><input type="text" size="1" id="22Lb"></td> \
				<td><input type="text" size="1" id="22Lc"></td> \
				<td><input type="text" size="1" id="23La"></td> \
				<td><input type="text" size="1" id="23Lb"></td> \
				<td><input type="text" size="1" id="23Lc"></td> \
				<td><input type="text" size="1" id="24La"></td> \
				<td><input type="text" size="1" id="24Lb"></td> \
				<td><input type="text" size="1" id="24Lc"></td> \
				<td><input type="text" size="1" id="25La"></td> \
				<td><input type="text" size="1" id="25Lb"></td> \
				<td><input type="text" size="1" id="25Lc"></td> \
				<td><input type="text" size="1" id="26La"></td> \
				<td><input type="text" size="1" id="26Lb"></td> \
				<td><input type="text" size="1" id="26Lc"></td> \
				<td><input type="text" size="1" id="27La"></td> \
				<td><input type="text" size="1" id="27Lb"></td> \
				<td><input type="text" size="1" id="27Lc"></td> \
				<td><input type="text" size="1" id="28La"></td> \
				<td><input type="text" size="1" id="28Lb"></td> \
				<td><input type="text" size="1" id="28Lc"></td> \
			</tr>\
			<tr> \
				<td class="table_title row_title">Niveau gingival</td>\
				<td><input type="text" size="1" id="18LGa"></td> \
				<td><input type="text" size="1" id="18LGb"></td> \
				<td><input type="text" size="1" id="18LGc"></td> \
				<td><input type="text" size="1" id="17LGa"></td> \
				<td><input type="text" size="1" id="17LGb"></td> \
				<td><input type="text" size="1" id="17LGc"></td> \
				<td><input type="text" size="1" id="16LGa"></td> \
				<td><input type="text" size="1" id="16LGb"></td> \
				<td><input type="text" size="1" id="16LGc"></td> \
				<td><input type="text" size="1" id="15LGa"></td> \
				<td><input type="text" size="1" id="15LGb"></td> \
				<td><input type="text" size="1" id="15LGc"></td> \
				<td><input type="text" size="1" id="14LGa"></td> \
				<td><input type="text" size="1" id="14LGb"></td> \
				<td><input type="text" size="1" id="14LGc"></td> \
				<td><input type="text" size="1" id="13LGa"></td> \
				<td><input type="text" size="1" id="13LGb"></td> \
				<td><input type="text" size="1" id="13LGc"></td> \
				<td><input type="text" size="1" id="12LGa"></td> \
				<td><input type="text" size="1" id="12LGb"></td> \
				<td><input type="text" size="1" id="12LGc"></td> \
				<td><input type="text" size="1" id="11LGa"></td> \
				<td><input type="text" size="1" id="11LGb"></td> \
				<td><input type="text" size="1" id="11LGc"></td> \
															  \
				<td><input type="text" size="1" id="21LGa"></td> \
				<td><input type="text" size="1" id="21LGb"></td> \
				<td><input type="text" size="1" id="21LGc"></td> \
				<td><input type="text" size="1" id="22LGa"></td> \
				<td><input type="text" size="1" id="22LGb"></td> \
				<td><input type="text" size="1" id="22LGc"></td> \
				<td><input type="text" size="1" id="23LGa"></td> \
				<td><input type="text" size="1" id="23LGb"></td> \
				<td><input type="text" size="1" id="23LGc"></td> \
				<td><input type="text" size="1" id="24LGa"></td> \
				<td><input type="text" size="1" id="24LGb"></td> \
				<td><input type="text" size="1" id="24LGc"></td> \
				<td><input type="text" size="1" id="25LGa"></td> \
				<td><input type="text" size="1" id="25LGb"></td> \
				<td><input type="text" size="1" id="25LGc"></td> \
				<td><input type="text" size="1" id="26LGa"></td> \
				<td><input type="text" size="1" id="26LGb"></td> \
				<td><input type="text" size="1" id="26LGc"></td> \
				<td><input type="text" size="1" id="27LGa"></td> \
				<td><input type="text" size="1" id="27LGb"></td> \
				<td><input type="text" size="1" id="27LGc"></td> \
				<td><input type="text" size="1" id="28LGa"></td> \
				<td><input type="text" size="1" id="28LGb"></td> \
				<td><input type="text" size="1" id="28LGc"></td> \
			</tr>\
			<tr class="cb plq">\
				<td class="table_title row_title">Plaque</td>\
				<td><input id="plq18La" type="checkbox"/><label for="plq18La"></label>\</td>\
				<td><input id="plq18Lb" type="checkbox"/><label for="plq18Lb"></label>\</td>\
				<td><input id="plq18Lc" type="checkbox"/><label for="plq18Lc"></label>\</td>\
				<td><input id="plq17La" type="checkbox"/><label for="plq17La"></label>\</td>\
				<td><input id="plq17Lb" type="checkbox"/><label for="plq17Lb"></label>\</td>\
				<td><input id="plq17Lc" type="checkbox"/><label for="plq17Lc"></label>\</td>\
				<td><input id="plq16La" type="checkbox"/><label for="plq16La"></label>\</td>\
				<td><input id="plq16Lb" type="checkbox"/><label for="plq16Lb"></label>\</td>\
				<td><input id="plq16Lc" type="checkbox"/><label for="plq16Lc"></label>\</td>\
				<td><input id="plq15La" type="checkbox"/><label for="plq15La"></label>\</td>\
				<td><input id="plq15Lb" type="checkbox"/><label for="plq15Lb"></label>\</td>\
				<td><input id="plq15Lc" type="checkbox"/><label for="plq15Lc"></label>\</td>\
				<td><input id="plq14La" type="checkbox"/><label for="plq14La"></label>\</td>\
				<td><input id="plq14Lb" type="checkbox"/><label for="plq14Lb"></label>\</td>\
				<td><input id="plq14Lc" type="checkbox"/><label for="plq14Lc"></label>\</td>\
				<td><input id="plq13La" type="checkbox"/><label for="plq13La"></label>\</td>\
				<td><input id="plq13Lb" type="checkbox"/><label for="plq13Lb"></label>\</td>\
				<td><input id="plq13Lc" type="checkbox"/><label for="plq13Lc"></label>\</td>\
				<td><input id="plq12La" type="checkbox"/><label for="plq12La"></label>\</td>\
				<td><input id="plq12Lb" type="checkbox"/><label for="plq12Lb"></label>\</td>\
				<td><input id="plq12Lc" type="checkbox"/><label for="plq12Lc"></label>\</td>\
				<td><input id="plq11La" type="checkbox"/><label for="plq11La"></label>\</td>\
				<td><input id="plq11Lb" type="checkbox"/><label for="plq11Lb"></label>\</td>\
				<td><input id="plq11Lc" type="checkbox"/><label for="plq11Lc"></label>\</td>\
				<td><input id="plq21La" type="checkbox"/><label for="plq21La"></label>\</td>\
				<td><input id="plq21Lb" type="checkbox"/><label for="plq21Lb"></label>\</td>\
				<td><input id="plq21Lc" type="checkbox"/><label for="plq21Lc"></label>\</td>\
				<td><input id="plq22La" type="checkbox"/><label for="plq22La"></label>\</td>\
				<td><input id="plq22Lb" type="checkbox"/><label for="plq22Lb"></label>\</td>\
				<td><input id="plq22Lc" type="checkbox"/><label for="plq22Lc"></label>\</td>\
				<td><input id="plq23La" type="checkbox"/><label for="plq23La"></label>\</td>\
				<td><input id="plq23Lb" type="checkbox"/><label for="plq23Lb"></label>\</td>\
				<td><input id="plq23Lc" type="checkbox"/><label for="plq23Lc"></label>\</td>\
				<td><input id="plq24La" type="checkbox"/><label for="plq24La"></label>\</td>\
				<td><input id="plq24Lb" type="checkbox"/><label for="plq24Lb"></label>\</td>\
				<td><input id="plq24Lc" type="checkbox"/><label for="plq24Lc"></label>\</td>\
				<td><input id="plq25La" type="checkbox"/><label for="plq25La"></label>\</td>\
				<td><input id="plq25Lb" type="checkbox"/><label for="plq25Lb"></label>\</td>\
				<td><input id="plq25Lc" type="checkbox"/><label for="plq25Lc"></label>\</td>\
				<td><input id="plq26La" type="checkbox"/><label for="plq26La"></label>\</td>\
				<td><input id="plq26Lb" type="checkbox"/><label for="plq26Lb"></label>\</td>\
				<td><input id="plq26Lc" type="checkbox"/><label for="plq26Lc"></label>\</td>\
				<td><input id="plq27La" type="checkbox"/><label for="plq27La"></label>\</td>\
				<td><input id="plq27Lb" type="checkbox"/><label for="plq27Lb"></label>\</td>\
				<td><input id="plq27Lc" type="checkbox"/><label for="plq27Lc"></label>\</td>\
				<td><input id="plq28La" type="checkbox"/><label for="plq28La"></label>\</td>\
				<td><input id="plq28Lb" type="checkbox"/><label for="plq28Lb"></label>\</td>\
				<td><input id="plq28Lc" type="checkbox"/><label for="plq28Lc"></label>\</td>\
			</tr>\
			<tr class="cb bop">\
				<td class="table_title row_title">Saignement au sondage</td>\
				<td><input id="bop18La" type="checkbox"/><label for="bop18La"></label>\</td>\
				<td><input id="bop18Lb" type="checkbox"/><label for="bop18Lb"></label>\</td>\
				<td><input id="bop18Lc" type="checkbox"/><label for="bop18Lc"></label>\</td>\
				<td><input id="bop17La" type="checkbox"/><label for="bop17La"></label>\</td>\
				<td><input id="bop17Lb" type="checkbox"/><label for="bop17Lb"></label>\</td>\
				<td><input id="bop17Lc" type="checkbox"/><label for="bop17Lc"></label>\</td>\
				<td><input id="bop16La" type="checkbox"/><label for="bop16La"></label>\</td>\
				<td><input id="bop16Lb" type="checkbox"/><label for="bop16Lb"></label>\</td>\
				<td><input id="bop16Lc" type="checkbox"/><label for="bop16Lc"></label>\</td>\
				<td><input id="bop15La" type="checkbox"/><label for="bop15La"></label>\</td>\
				<td><input id="bop15Lb" type="checkbox"/><label for="bop15Lb"></label>\</td>\
				<td><input id="bop15Lc" type="checkbox"/><label for="bop15Lc"></label>\</td>\
				<td><input id="bop14La" type="checkbox"/><label for="bop14La"></label>\</td>\
				<td><input id="bop14Lb" type="checkbox"/><label for="bop14Lb"></label>\</td>\
				<td><input id="bop14Lc" type="checkbox"/><label for="bop14Lc"></label>\</td>\
				<td><input id="bop13La" type="checkbox"/><label for="bop13La"></label>\</td>\
				<td><input id="bop13Lb" type="checkbox"/><label for="bop13Lb"></label>\</td>\
				<td><input id="bop13Lc" type="checkbox"/><label for="bop13Lc"></label>\</td>\
				<td><input id="bop12La" type="checkbox"/><label for="bop12La"></label>\</td>\
				<td><input id="bop12Lb" type="checkbox"/><label for="bop12Lb"></label>\</td>\
				<td><input id="bop12Lc" type="checkbox"/><label for="bop12Lc"></label>\</td>\
				<td><input id="bop11La" type="checkbox"/><label for="bop11La"></label>\</td>\
				<td><input id="bop11Lb" type="checkbox"/><label for="bop11Lb"></label>\</td>\
				<td><input id="bop11Lc" type="checkbox"/><label for="bop11Lc"></label>\</td>\
				<td><input id="bop21La" type="checkbox"/><label for="bop21La"></label>\</td>\
				<td><input id="bop21Lb" type="checkbox"/><label for="bop21Lb"></label>\</td>\
				<td><input id="bop21Lc" type="checkbox"/><label for="bop21Lc"></label>\</td>\
				<td><input id="bop22La" type="checkbox"/><label for="bop22La"></label>\</td>\
				<td><input id="bop22Lb" type="checkbox"/><label for="bop22Lb"></label>\</td>\
				<td><input id="bop22Lc" type="checkbox"/><label for="bop22Lc"></label>\</td>\
				<td><input id="bop23La" type="checkbox"/><label for="bop23La"></label>\</td>\
				<td><input id="bop23Lb" type="checkbox"/><label for="bop23Lb"></label>\</td>\
				<td><input id="bop23Lc" type="checkbox"/><label for="bop23Lc"></label>\</td>\
				<td><input id="bop24La" type="checkbox"/><label for="bop24La"></label>\</td>\
				<td><input id="bop24Lb" type="checkbox"/><label for="bop24Lb"></label>\</td>\
				<td><input id="bop24Lc" type="checkbox"/><label for="bop24Lc"></label>\</td>\
				<td><input id="bop25La" type="checkbox"/><label for="bop25La"></label>\</td>\
				<td><input id="bop25Lb" type="checkbox"/><label for="bop25Lb"></label>\</td>\
				<td><input id="bop25Lc" type="checkbox"/><label for="bop25Lc"></label>\</td>\
				<td><input id="bop26La" type="checkbox"/><label for="bop26La"></label>\</td>\
				<td><input id="bop26Lb" type="checkbox"/><label for="bop26Lb"></label>\</td>\
				<td><input id="bop26Lc" type="checkbox"/><label for="bop26Lc"></label>\</td>\
				<td><input id="bop27La" type="checkbox"/><label for="bop27La"></label>\</td>\
				<td><input id="bop27Lb" type="checkbox"/><label for="bop27Lb"></label>\</td>\
				<td><input id="bop27Lc" type="checkbox"/><label for="bop27Lc"></label>\</td>\
				<td><input id="bop28La" type="checkbox"/><label for="bop28La"></label>\</td>\
				<td><input id="bop28Lb" type="checkbox"/><label for="bop28Lb"></label>\</td>\
				<td><input id="bop28Lc" type="checkbox"/><label for="bop28Lc"></label>\</td>\
			</tr>\
			<tr class="table_title teeth_num"> \
				<td></td>\
				<td colspan="3">18 L</td> \
				<td colspan="3">17 L</td> \
				<td colspan="3">16 L</td> \
				<td colspan="3">15 L</td> \
				<td colspan="3">14 L</td> \
				<td colspan="3">13 L</td> \
				<td colspan="3">12 L</td> \
				<td colspan="3">11 L</td> \
				<td colspan="3">21 L</td> \
				<td colspan="3">22 L</td> \
				<td colspan="3">23 L</td> \
				<td colspan="3">24 L</td> \
				<td colspan="3">25 L</td> \
				<td colspan="3">26 L</td> \
				<td colspan="3">27 L</td> \
				<td colspan="3">28 L</td> \
			</tr> \
			\
		</table>\
		<table class="table"> \
			<tr class="table_title teeth_num"> \
				<td></td>\
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
			<tr>\
				<td class="table_title row_title">Implant</td>\
				<td colspan="3"><input id="impl48" type="checkbox"/></td>\
				<td colspan="3"><input id="impl47" type="checkbox"/></td>\
				<td colspan="3"><input id="impl46" type="checkbox"/></td>\
				<td colspan="3"><input id="impl45" type="checkbox"/></td>\
				<td colspan="3"><input id="impl44" type="checkbox"/></td>\
				<td colspan="3"><input id="impl43" type="checkbox"/></td>\
				<td colspan="3"><input id="impl42" type="checkbox"/></td>\
				<td colspan="3"><input id="impl41" type="checkbox"/></td>\
				<td colspan="3"><input id="impl31" type="checkbox"/></td>\
				<td colspan="3"><input id="impl32" type="checkbox"/></td>\
				<td colspan="3"><input id="impl33" type="checkbox"/></td>\
				<td colspan="3"><input id="impl34" type="checkbox"/></td>\
				<td colspan="3"><input id="impl35" type="checkbox"/></td>\
				<td colspan="3"><input id="impl36" type="checkbox"/></td>\
				<td colspan="3"><input id="impl37" type="checkbox"/></td>\
				<td colspan="3"><input id="impl38" type="checkbox"/></td>\
			</tr>\
			<tr class="cb bop">\
				<td class="table_title row_title">Saignement au sondage</td>\
				<td><input id="bop48a" type="checkbox"/><label for="bop48a"></label>\</td>\
				<td><input id="bop48b" type="checkbox"/><label for="bop48b"></label>\</td>\
				<td><input id="bop48c" type="checkbox"/><label for="bop48c"></label>\</td>\
				<td><input id="bop47a" type="checkbox"/><label for="bop47a"></label>\</td>\
				<td><input id="bop47b" type="checkbox"/><label for="bop47b"></label>\</td>\
				<td><input id="bop47c" type="checkbox"/><label for="bop47c"></label>\</td>\
				<td><input id="bop46a" type="checkbox"/><label for="bop46a"></label>\</td>\
				<td><input id="bop46b" type="checkbox"/><label for="bop46b"></label>\</td>\
				<td><input id="bop46c" type="checkbox"/><label for="bop46c"></label>\</td>\
				<td><input id="bop45a" type="checkbox"/><label for="bop45a"></label>\</td>\
				<td><input id="bop45b" type="checkbox"/><label for="bop45b"></label>\</td>\
				<td><input id="bop45c" type="checkbox"/><label for="bop45c"></label>\</td>\
				<td><input id="bop44a" type="checkbox"/><label for="bop44a"></label>\</td>\
				<td><input id="bop44b" type="checkbox"/><label for="bop44b"></label>\</td>\
				<td><input id="bop44c" type="checkbox"/><label for="bop44c"></label>\</td>\
				<td><input id="bop43a" type="checkbox"/><label for="bop43a"></label>\</td>\
				<td><input id="bop43b" type="checkbox"/><label for="bop43b"></label>\</td>\
				<td><input id="bop43c" type="checkbox"/><label for="bop43c"></label>\</td>\
				<td><input id="bop42a" type="checkbox"/><label for="bop42a"></label>\</td>\
				<td><input id="bop42b" type="checkbox"/><label for="bop42b"></label>\</td>\
				<td><input id="bop42c" type="checkbox"/><label for="bop42c"></label>\</td>\
				<td><input id="bop41a" type="checkbox"/><label for="bop41a"></label>\</td>\
				<td><input id="bop41b" type="checkbox"/><label for="bop41b"></label>\</td>\
				<td><input id="bop41c" type="checkbox"/><label for="bop41c"></label>\</td>\
				<td><input id="bop31a" type="checkbox"/><label for="bop31a"></label>\</td>\
				<td><input id="bop31b" type="checkbox"/><label for="bop31b"></label>\</td>\
				<td><input id="bop31c" type="checkbox"/><label for="bop31c"></label>\</td>\
				<td><input id="bop32a" type="checkbox"/><label for="bop32a"></label>\</td>\
				<td><input id="bop32b" type="checkbox"/><label for="bop32b"></label>\</td>\
				<td><input id="bop32c" type="checkbox"/><label for="bop32c"></label>\</td>\
				<td><input id="bop33a" type="checkbox"/><label for="bop33a"></label>\</td>\
				<td><input id="bop33b" type="checkbox"/><label for="bop33b"></label>\</td>\
				<td><input id="bop33c" type="checkbox"/><label for="bop33c"></label>\</td>\
				<td><input id="bop34a" type="checkbox"/><label for="bop34a"></label>\</td>\
				<td><input id="bop34b" type="checkbox"/><label for="bop34b"></label>\</td>\
				<td><input id="bop34c" type="checkbox"/><label for="bop34c"></label>\</td>\
				<td><input id="bop35a" type="checkbox"/><label for="bop35a"></label>\</td>\
				<td><input id="bop35b" type="checkbox"/><label for="bop35b"></label>\</td>\
				<td><input id="bop35c" type="checkbox"/><label for="bop35c"></label>\</td>\
				<td><input id="bop36a" type="checkbox"/><label for="bop36a"></label>\</td>\
				<td><input id="bop36b" type="checkbox"/><label for="bop36b"></label>\</td>\
				<td><input id="bop36c" type="checkbox"/><label for="bop36c"></label>\</td>\
				<td><input id="bop37a" type="checkbox"/><label for="bop37a"></label>\</td>\
				<td><input id="bop37b" type="checkbox"/><label for="bop37b"></label>\</td>\
				<td><input id="bop37c" type="checkbox"/><label for="bop37c"></label>\</td>\
				<td><input id="bop38a" type="checkbox"/><label for="bop38a"></label>\</td>\
				<td><input id="bop38b" type="checkbox"/><label for="bop38b"></label>\</td>\
				<td><input id="bop38c" type="checkbox"/><label for="bop38c"></label>\</td>\
			</tr>\
			<tr class="cb plq">\
				<td class="table_title row_title">Plaque</td>\
				<td><input id="plq48a" type="checkbox"/><label for="plq48a"></label>\</td>\
				<td><input id="plq48b" type="checkbox"/><label for="plq48b"></label>\</td>\
				<td><input id="plq48c" type="checkbox"/><label for="plq48c"></label>\</td>\
				<td><input id="plq47a" type="checkbox"/><label for="plq47a"></label>\</td>\
				<td><input id="plq47b" type="checkbox"/><label for="plq47b"></label>\</td>\
				<td><input id="plq47c" type="checkbox"/><label for="plq47c"></label>\</td>\
				<td><input id="plq46a" type="checkbox"/><label for="plq46a"></label>\</td>\
				<td><input id="plq46b" type="checkbox"/><label for="plq46b"></label>\</td>\
				<td><input id="plq46c" type="checkbox"/><label for="plq46c"></label>\</td>\
				<td><input id="plq45a" type="checkbox"/><label for="plq45a"></label>\</td>\
				<td><input id="plq45b" type="checkbox"/><label for="plq45b"></label>\</td>\
				<td><input id="plq45c" type="checkbox"/><label for="plq45c"></label>\</td>\
				<td><input id="plq44a" type="checkbox"/><label for="plq44a"></label>\</td>\
				<td><input id="plq44b" type="checkbox"/><label for="plq44b"></label>\</td>\
				<td><input id="plq44c" type="checkbox"/><label for="plq44c"></label>\</td>\
				<td><input id="plq43a" type="checkbox"/><label for="plq43a"></label>\</td>\
				<td><input id="plq43b" type="checkbox"/><label for="plq43b"></label>\</td>\
				<td><input id="plq43c" type="checkbox"/><label for="plq43c"></label>\</td>\
				<td><input id="plq42a" type="checkbox"/><label for="plq42a"></label>\</td>\
				<td><input id="plq42b" type="checkbox"/><label for="plq42b"></label>\</td>\
				<td><input id="plq42c" type="checkbox"/><label for="plq42c"></label>\</td>\
				<td><input id="plq41a" type="checkbox"/><label for="plq41a"></label>\</td>\
				<td><input id="plq41b" type="checkbox"/><label for="plq41b"></label>\</td>\
				<td><input id="plq41c" type="checkbox"/><label for="plq41c"></label>\</td>\
				<td><input id="plq31a" type="checkbox"/><label for="plq31a"></label>\</td>\
				<td><input id="plq31b" type="checkbox"/><label for="plq31b"></label>\</td>\
				<td><input id="plq31c" type="checkbox"/><label for="plq31c"></label>\</td>\
				<td><input id="plq32a" type="checkbox"/><label for="plq32a"></label>\</td>\
				<td><input id="plq32b" type="checkbox"/><label for="plq32b"></label>\</td>\
				<td><input id="plq32c" type="checkbox"/><label for="plq32c"></label>\</td>\
				<td><input id="plq33a" type="checkbox"/><label for="plq33a"></label>\</td>\
				<td><input id="plq33b" type="checkbox"/><label for="plq33b"></label>\</td>\
				<td><input id="plq33c" type="checkbox"/><label for="plq33c"></label>\</td>\
				<td><input id="plq34a" type="checkbox"/><label for="plq34a"></label>\</td>\
				<td><input id="plq34b" type="checkbox"/><label for="plq34b"></label>\</td>\
				<td><input id="plq34c" type="checkbox"/><label for="plq34c"></label>\</td>\
				<td><input id="plq35a" type="checkbox"/><label for="plq35a"></label>\</td>\
				<td><input id="plq35b" type="checkbox"/><label for="plq35b"></label>\</td>\
				<td><input id="plq35c" type="checkbox"/><label for="plq35c"></label>\</td>\
				<td><input id="plq36a" type="checkbox"/><label for="plq36a"></label>\</td>\
				<td><input id="plq36b" type="checkbox"/><label for="plq36b"></label>\</td>\
				<td><input id="plq36c" type="checkbox"/><label for="plq36c"></label>\</td>\
				<td><input id="plq37a" type="checkbox"/><label for="plq37a"></label>\</td>\
				<td><input id="plq37b" type="checkbox"/><label for="plq37b"></label>\</td>\
				<td><input id="plq37c" type="checkbox"/><label for="plq37c"></label>\</td>\
				<td><input id="plq38a" type="checkbox"/><label for="plq38a"></label>\</td>\
				<td><input id="plq38b" type="checkbox"/><label for="plq38b"></label>\</td>\
				<td><input id="plq38c" type="checkbox"/><label for="plq38c"></label>\</td>\
			</tr>\
			<tr> \
				<td class="table_title row_title">Niveau gingival</td>\
				<td><input type="text" size="1" id="48Ga"></td> \
				<td><input type="text" size="1" id="48Gb"></td> \
				<td><input type="text" size="1" id="48Gc"></td> \
				<td><input type="text" size="1" id="47Ga"></td> \
				<td><input type="text" size="1" id="47Gb"></td> \
				<td><input type="text" size="1" id="47Gc"></td> \
				<td><input type="text" size="1" id="46Ga"></td> \
				<td><input type="text" size="1" id="46Gb"></td> \
				<td><input type="text" size="1" id="46Gc"></td> \
				<td><input type="text" size="1" id="45Ga"></td> \
				<td><input type="text" size="1" id="45Gb"></td> \
				<td><input type="text" size="1" id="45Gc"></td> \
				<td><input type="text" size="1" id="44Ga"></td> \
				<td><input type="text" size="1" id="44Gb"></td> \
				<td><input type="text" size="1" id="44Gc"></td> \
				<td><input type="text" size="1" id="43Ga"></td> \
				<td><input type="text" size="1" id="43Gb"></td> \
				<td><input type="text" size="1" id="43Gc"></td> \
				<td><input type="text" size="1" id="42Ga"></td> \
				<td><input type="text" size="1" id="42Gb"></td> \
				<td><input type="text" size="1" id="42Gc"></td> \
				<td><input type="text" size="1" id="41Ga"></td> \
				<td><input type="text" size="1" id="41Gb"></td> \
				<td><input type="text" size="1" id="41Gc"></td> \
															   \
				<td><input type="text" size="1" id="31Ga"></td> \
				<td><input type="text" size="1" id="31Gb"></td> \
				<td><input type="text" size="1" id="31Gc"></td> \
				<td><input type="text" size="1" id="32Ga"></td> \
				<td><input type="text" size="1" id="32Gb"></td> \
				<td><input type="text" size="1" id="32Gc"></td> \
				<td><input type="text" size="1" id="33Ga"></td> \
				<td><input type="text" size="1" id="33Gb"></td> \
				<td><input type="text" size="1" id="33Gc"></td> \
				<td><input type="text" size="1" id="34Ga"></td> \
				<td><input type="text" size="1" id="34Gb"></td> \
				<td><input type="text" size="1" id="34Gc"></td> \
				<td><input type="text" size="1" id="35Ga"></td> \
				<td><input type="text" size="1" id="35Gb"></td> \
				<td><input type="text" size="1" id="35Gc"></td> \
				<td><input type="text" size="1" id="36Ga"></td> \
				<td><input type="text" size="1" id="36Gb"></td> \
				<td><input type="text" size="1" id="36Gc"></td> \
				<td><input type="text" size="1" id="37Ga"></td> \
				<td><input type="text" size="1" id="37Gb"></td> \
				<td><input type="text" size="1" id="37Gc"></td> \
				<td><input type="text" size="1" id="38Ga"></td> \
				<td><input type="text" size="1" id="38Gb"></td> \
				<td><input type="text" size="1" id="38Gc"></td> \
			</tr> \
			<tr> \
				<td class="table_title row_title">Profondeur de sondage</td>\
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
			</tr> \
			<tr> \
				<td class="table_title row_title"></td>\
				<td colspan="48"> \
				<div style="width:100%;"> \
					<canvas id="vrc_display1" style="display:inline-block;max-width:100%;max-height:100%;"></canvas> \
				</div> \
				</td> \
			</tr> \
			\
			<tr> \
				<td class="table_title row_title">Profondeur de sondage</td>\
				<td><input type="text" size="1" id="48La"></td> \
				<td><input type="text" size="1" id="48Lb"></td> \
				<td><input type="text" size="1" id="48Lc"></td> \
				<td><input type="text" size="1" id="47La"></td> \
				<td><input type="text" size="1" id="47Lb"></td> \
				<td><input type="text" size="1" id="47Lc"></td> \
				<td><input type="text" size="1" id="46La"></td> \
				<td><input type="text" size="1" id="46Lb"></td> \
				<td><input type="text" size="1" id="46Lc"></td> \
				<td><input type="text" size="1" id="45La"></td> \
				<td><input type="text" size="1" id="45Lb"></td> \
				<td><input type="text" size="1" id="45Lc"></td> \
				<td><input type="text" size="1" id="44La"></td> \
				<td><input type="text" size="1" id="44Lb"></td> \
				<td><input type="text" size="1" id="44Lc"></td> \
				<td><input type="text" size="1" id="43La"></td> \
				<td><input type="text" size="1" id="43Lb"></td> \
				<td><input type="text" size="1" id="43Lc"></td> \
				<td><input type="text" size="1" id="42La"></td> \
				<td><input type="text" size="1" id="42Lb"></td> \
				<td><input type="text" size="1" id="42Lc"></td> \
				<td><input type="text" size="1" id="41La"></td> \
				<td><input type="text" size="1" id="41Lb"></td> \
				<td><input type="text" size="1" id="41Lc"></td> \
															   \
				<td><input type="text" size="1" id="31La"></td> \
				<td><input type="text" size="1" id="31Lb"></td> \
				<td><input type="text" size="1" id="31Lc"></td> \
				<td><input type="text" size="1" id="32La"></td> \
				<td><input type="text" size="1" id="32Lb"></td> \
				<td><input type="text" size="1" id="32Lc"></td> \
				<td><input type="text" size="1" id="33La"></td> \
				<td><input type="text" size="1" id="33Lb"></td> \
				<td><input type="text" size="1" id="33Lc"></td> \
				<td><input type="text" size="1" id="34La"></td> \
				<td><input type="text" size="1" id="34Lb"></td> \
				<td><input type="text" size="1" id="34Lc"></td> \
				<td><input type="text" size="1" id="35La"></td> \
				<td><input type="text" size="1" id="35Lb"></td> \
				<td><input type="text" size="1" id="35Lc"></td> \
				<td><input type="text" size="1" id="36La"></td> \
				<td><input type="text" size="1" id="36Lb"></td> \
				<td><input type="text" size="1" id="36Lc"></td> \
				<td><input type="text" size="1" id="37La"></td> \
				<td><input type="text" size="1" id="37Lb"></td> \
				<td><input type="text" size="1" id="37Lc"></td> \
				<td><input type="text" size="1" id="38La"></td> \
				<td><input type="text" size="1" id="38Lb"></td> \
				<td><input type="text" size="1" id="38Lc"></td> \
			</tr>\
			<tr> \
				<td class="table_title row_title">Niveau gingival</td>\
				<td><input type="text" size="1" id="18LGa"></td> \
				<td><input type="text" size="1" id="18LGb"></td> \
				<td><input type="text" size="1" id="18LGc"></td> \
				<td><input type="text" size="1" id="17LGa"></td> \
				<td><input type="text" size="1" id="17LGb"></td> \
				<td><input type="text" size="1" id="17LGc"></td> \
				<td><input type="text" size="1" id="16LGa"></td> \
				<td><input type="text" size="1" id="16LGb"></td> \
				<td><input type="text" size="1" id="16LGc"></td> \
				<td><input type="text" size="1" id="15LGa"></td> \
				<td><input type="text" size="1" id="15LGb"></td> \
				<td><input type="text" size="1" id="15LGc"></td> \
				<td><input type="text" size="1" id="14LGa"></td> \
				<td><input type="text" size="1" id="14LGb"></td> \
				<td><input type="text" size="1" id="14LGc"></td> \
				<td><input type="text" size="1" id="13LGa"></td> \
				<td><input type="text" size="1" id="13LGb"></td> \
				<td><input type="text" size="1" id="13LGc"></td> \
				<td><input type="text" size="1" id="12LGa"></td> \
				<td><input type="text" size="1" id="12LGb"></td> \
				<td><input type="text" size="1" id="12LGc"></td> \
				<td><input type="text" size="1" id="11LGa"></td> \
				<td><input type="text" size="1" id="11LGb"></td> \
				<td><input type="text" size="1" id="11LGc"></td> \
															  \
				<td><input type="text" size="1" id="21LGa"></td> \
				<td><input type="text" size="1" id="21LGb"></td> \
				<td><input type="text" size="1" id="21LGc"></td> \
				<td><input type="text" size="1" id="22LGa"></td> \
				<td><input type="text" size="1" id="22LGb"></td> \
				<td><input type="text" size="1" id="22LGc"></td> \
				<td><input type="text" size="1" id="23LGa"></td> \
				<td><input type="text" size="1" id="23LGb"></td> \
				<td><input type="text" size="1" id="23LGc"></td> \
				<td><input type="text" size="1" id="24LGa"></td> \
				<td><input type="text" size="1" id="24LGb"></td> \
				<td><input type="text" size="1" id="24LGc"></td> \
				<td><input type="text" size="1" id="25LGa"></td> \
				<td><input type="text" size="1" id="25LGb"></td> \
				<td><input type="text" size="1" id="25LGc"></td> \
				<td><input type="text" size="1" id="26LGa"></td> \
				<td><input type="text" size="1" id="26LGb"></td> \
				<td><input type="text" size="1" id="26LGc"></td> \
				<td><input type="text" size="1" id="27LGa"></td> \
				<td><input type="text" size="1" id="27LGb"></td> \
				<td><input type="text" size="1" id="27LGc"></td> \
				<td><input type="text" size="1" id="28LGa"></td> \
				<td><input type="text" size="1" id="28LGb"></td> \
				<td><input type="text" size="1" id="28LGc"></td> \
			</tr>\
			<tr class="cb plq">\
				<td class="table_title row_title">Plaque</td>\
				<td><input id="plq48La" type="checkbox"/><label for="plq48La"></label>\</td>\
				<td><input id="plq48Lb" type="checkbox"/><label for="plq48Lb"></label>\</td>\
				<td><input id="plq48Lc" type="checkbox"/><label for="plq48Lc"></label>\</td>\
				<td><input id="plq47La" type="checkbox"/><label for="plq47La"></label>\</td>\
				<td><input id="plq47Lb" type="checkbox"/><label for="plq47Lb"></label>\</td>\
				<td><input id="plq47Lc" type="checkbox"/><label for="plq47Lc"></label>\</td>\
				<td><input id="plq46La" type="checkbox"/><label for="plq46La"></label>\</td>\
				<td><input id="plq46Lb" type="checkbox"/><label for="plq46Lb"></label>\</td>\
				<td><input id="plq46Lc" type="checkbox"/><label for="plq46Lc"></label>\</td>\
				<td><input id="plq45La" type="checkbox"/><label for="plq45La"></label>\</td>\
				<td><input id="plq45Lb" type="checkbox"/><label for="plq45Lb"></label>\</td>\
				<td><input id="plq45Lc" type="checkbox"/><label for="plq45Lc"></label>\</td>\
				<td><input id="plq44La" type="checkbox"/><label for="plq44La"></label>\</td>\
				<td><input id="plq44Lb" type="checkbox"/><label for="plq44Lb"></label>\</td>\
				<td><input id="plq44Lc" type="checkbox"/><label for="plq44Lc"></label>\</td>\
				<td><input id="plq43La" type="checkbox"/><label for="plq43La"></label>\</td>\
				<td><input id="plq43Lb" type="checkbox"/><label for="plq43Lb"></label>\</td>\
				<td><input id="plq43Lc" type="checkbox"/><label for="plq43Lc"></label>\</td>\
				<td><input id="plq42La" type="checkbox"/><label for="plq42La"></label>\</td>\
				<td><input id="plq42Lb" type="checkbox"/><label for="plq42Lb"></label>\</td>\
				<td><input id="plq42Lc" type="checkbox"/><label for="plq42Lc"></label>\</td>\
				<td><input id="plq41La" type="checkbox"/><label for="plq41La"></label>\</td>\
				<td><input id="plq41Lb" type="checkbox"/><label for="plq41Lb"></label>\</td>\
				<td><input id="plq41Lc" type="checkbox"/><label for="plq41Lc"></label>\</td>\
				<td><input id="plq31La" type="checkbox"/><label for="plq31La"></label>\</td>\
				<td><input id="plq31Lb" type="checkbox"/><label for="plq31Lb"></label>\</td>\
				<td><input id="plq31Lc" type="checkbox"/><label for="plq31Lc"></label>\</td>\
				<td><input id="plq32La" type="checkbox"/><label for="plq32La"></label>\</td>\
				<td><input id="plq32Lb" type="checkbox"/><label for="plq32Lb"></label>\</td>\
				<td><input id="plq32Lc" type="checkbox"/><label for="plq32Lc"></label>\</td>\
				<td><input id="plq33La" type="checkbox"/><label for="plq33La"></label>\</td>\
				<td><input id="plq33Lb" type="checkbox"/><label for="plq33Lb"></label>\</td>\
				<td><input id="plq33Lc" type="checkbox"/><label for="plq33Lc"></label>\</td>\
				<td><input id="plq34La" type="checkbox"/><label for="plq34La"></label>\</td>\
				<td><input id="plq34Lb" type="checkbox"/><label for="plq34Lb"></label>\</td>\
				<td><input id="plq34Lc" type="checkbox"/><label for="plq34Lc"></label>\</td>\
				<td><input id="plq35La" type="checkbox"/><label for="plq35La"></label>\</td>\
				<td><input id="plq35Lb" type="checkbox"/><label for="plq35Lb"></label>\</td>\
				<td><input id="plq35Lc" type="checkbox"/><label for="plq35Lc"></label>\</td>\
				<td><input id="plq36La" type="checkbox"/><label for="plq36La"></label>\</td>\
				<td><input id="plq36Lb" type="checkbox"/><label for="plq36Lb"></label>\</td>\
				<td><input id="plq36Lc" type="checkbox"/><label for="plq36Lc"></label>\</td>\
				<td><input id="plq37La" type="checkbox"/><label for="plq37La"></label>\</td>\
				<td><input id="plq37Lb" type="checkbox"/><label for="plq37Lb"></label>\</td>\
				<td><input id="plq37Lc" type="checkbox"/><label for="plq37Lc"></label>\</td>\
				<td><input id="plq38La" type="checkbox"/><label for="plq38La"></label>\</td>\
				<td><input id="plq38Lb" type="checkbox"/><label for="plq38Lb"></label>\</td>\
				<td><input id="plq38Lc" type="checkbox"/><label for="plq38Lc"></label>\</td>\
			</tr>\
			<tr class="cb bop">\
				<td class="table_title row_title">Saignement au sondage</td>\
				<td><input id="bop48La" type="checkbox"/><label for="bop48La"></label>\</td>\
				<td><input id="bop48Lb" type="checkbox"/><label for="bop48Lb"></label>\</td>\
				<td><input id="bop48Lc" type="checkbox"/><label for="bop48Lc"></label>\</td>\
				<td><input id="bop47La" type="checkbox"/><label for="bop47La"></label>\</td>\
				<td><input id="bop47Lb" type="checkbox"/><label for="bop47Lb"></label>\</td>\
				<td><input id="bop47Lc" type="checkbox"/><label for="bop47Lc"></label>\</td>\
				<td><input id="bop46La" type="checkbox"/><label for="bop46La"></label>\</td>\
				<td><input id="bop46Lb" type="checkbox"/><label for="bop46Lb"></label>\</td>\
				<td><input id="bop46Lc" type="checkbox"/><label for="bop46Lc"></label>\</td>\
				<td><input id="bop45La" type="checkbox"/><label for="bop45La"></label>\</td>\
				<td><input id="bop45Lb" type="checkbox"/><label for="bop45Lb"></label>\</td>\
				<td><input id="bop45Lc" type="checkbox"/><label for="bop45Lc"></label>\</td>\
				<td><input id="bop44La" type="checkbox"/><label for="bop44La"></label>\</td>\
				<td><input id="bop44Lb" type="checkbox"/><label for="bop44Lb"></label>\</td>\
				<td><input id="bop44Lc" type="checkbox"/><label for="bop44Lc"></label>\</td>\
				<td><input id="bop43La" type="checkbox"/><label for="bop43La"></label>\</td>\
				<td><input id="bop43Lb" type="checkbox"/><label for="bop43Lb"></label>\</td>\
				<td><input id="bop43Lc" type="checkbox"/><label for="bop43Lc"></label>\</td>\
				<td><input id="bop42La" type="checkbox"/><label for="bop42La"></label>\</td>\
				<td><input id="bop42Lb" type="checkbox"/><label for="bop42Lb"></label>\</td>\
				<td><input id="bop42Lc" type="checkbox"/><label for="bop42Lc"></label>\</td>\
				<td><input id="bop41La" type="checkbox"/><label for="bop41La"></label>\</td>\
				<td><input id="bop41Lb" type="checkbox"/><label for="bop41Lb"></label>\</td>\
				<td><input id="bop41Lc" type="checkbox"/><label for="bop41Lc"></label>\</td>\
				<td><input id="bop31La" type="checkbox"/><label for="bop31La"></label>\</td>\
				<td><input id="bop31Lb" type="checkbox"/><label for="bop31Lb"></label>\</td>\
				<td><input id="bop31Lc" type="checkbox"/><label for="bop31Lc"></label>\</td>\
				<td><input id="bop32La" type="checkbox"/><label for="bop32La"></label>\</td>\
				<td><input id="bop32Lb" type="checkbox"/><label for="bop32Lb"></label>\</td>\
				<td><input id="bop32Lc" type="checkbox"/><label for="bop32Lc"></label>\</td>\
				<td><input id="bop33La" type="checkbox"/><label for="bop33La"></label>\</td>\
				<td><input id="bop33Lb" type="checkbox"/><label for="bop33Lb"></label>\</td>\
				<td><input id="bop33Lc" type="checkbox"/><label for="bop33Lc"></label>\</td>\
				<td><input id="bop34La" type="checkbox"/><label for="bop34La"></label>\</td>\
				<td><input id="bop34Lb" type="checkbox"/><label for="bop34Lb"></label>\</td>\
				<td><input id="bop34Lc" type="checkbox"/><label for="bop34Lc"></label>\</td>\
				<td><input id="bop35La" type="checkbox"/><label for="bop35La"></label>\</td>\
				<td><input id="bop35Lb" type="checkbox"/><label for="bop35Lb"></label>\</td>\
				<td><input id="bop35Lc" type="checkbox"/><label for="bop35Lc"></label>\</td>\
				<td><input id="bop36La" type="checkbox"/><label for="bop36La"></label>\</td>\
				<td><input id="bop36Lb" type="checkbox"/><label for="bop36Lb"></label>\</td>\
				<td><input id="bop36Lc" type="checkbox"/><label for="bop36Lc"></label>\</td>\
				<td><input id="bop37La" type="checkbox"/><label for="bop37La"></label>\</td>\
				<td><input id="bop37Lb" type="checkbox"/><label for="bop37Lb"></label>\</td>\
				<td><input id="bop37Lc" type="checkbox"/><label for="bop37Lc"></label>\</td>\
				<td><input id="bop38La" type="checkbox"/><label for="bop38La"></label>\</td>\
				<td><input id="bop38Lb" type="checkbox"/><label for="bop38Lb"></label>\</td>\
				<td><input id="bop38Lc" type="checkbox"/><label for="bop38Lc"></label>\</td>\
			</tr>\
			<tr class="table_title teeth_num"> \
				<td></td>\
				<td colspan="3">48 L</td> \
				<td colspan="3">47 L</td> \
				<td colspan="3">46 L</td> \
				<td colspan="3">45 L</td> \
				<td colspan="3">44 L</td> \
				<td colspan="3">43 L</td> \
				<td colspan="3">42 L</td> \
				<td colspan="3">41 L</td> \
				<td colspan="3">31 L</td> \
				<td colspan="3">32 L</td> \
				<td colspan="3">33 L</td> \
				<td colspan="3">34 L</td> \
				<td colspan="3">35 L</td> \
				<td colspan="3">36 L</td> \
				<td colspan="3">37 L</td> \
				<td colspan="3">38 L</td> \
			</tr> \
		</table>\
	</div>\
    <br>\
	<div class="no-print">\
		<label>Debug output : </label><br>\
		<textarea rows="6" id="dbg" style="width:100%;max-width:100%;">\
		</textarea>\
	</div>\
    </div>';
}

