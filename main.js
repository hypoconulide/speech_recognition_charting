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
				
				for (var i = 31 ; i < 39 ; i++)
				{
					this.Teeth[i - 31] = new Teeth(i, m_CellWidth * (i-23), 0);
					
					this.Teeth[i - 31].m_ImgFront.src = "https://github.com/philippe-bachour/resources/raw/master/Dentistry/teeth/" + i + ".png"; 
					this.Teeth[i - 31].m_ImgLing.src = "https://github.com/philippe-bachour/resources/raw/master/Dentistry/teeth/" + i + "_L.png"; 
					this.Teeth[i - 31].m_ImgFront.onload = this.checkLoadState.bind(this); 
					this.Teeth[i - 31].m_ImgLing.onload = this.checkLoadState.bind(this); 
				}
				for (var i = 41 ; i < 49 ; i++)
				{
					this.Teeth[i - 33] = new Teeth(i, m_CellWidth * -(i - 48), 0);
					
					this.Teeth[i - 33].m_ImgFront.src = "https://github.com/philippe-bachour/resources/raw/master/Dentistry/teeth/" + i + ".png";
					this.Teeth[i - 33].m_ImgLing.src = "https://github.com/philippe-bachour/resources/raw/master/Dentistry/teeth/" + i + "_L.png";
					this.Teeth[i - 33].m_ImgFront.onload = this.checkLoadState.bind(this);
					this.Teeth[i - 33].m_ImgLing.onload = this.checkLoadState.bind(this);
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
        
        for (var i = 0 ; i < this.Teeth.length ; ++i)
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
            
			ctx.beginPath();
            
			
			//front
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
			
			// back
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
            ctx.strokeStyle = '#B51515';
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
		this.CurrentTeeth = {major:0,minor:0,asObject:-1};
		this.CurrentField;
		this.HEIGHT_STEP = 5; // px Y step offset
	}
	
	initialise()
	{
		this.Mandibula.initialise();
		this.Maxilla.initialise();
		this.getCurrentField();
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
			this.CurrentTeeth.major++;
			
			if (this.CurrentTeeth.major == TeethMajor.length)
				this.CurrentTeeth.major = 0;
		}
	}
	
	getCurrentField()
	{
		this.CurrentField = document.getElementById(TeethMajor[this.CurrentTeeth.major] + TeethMinor[this.CurrentTeeth.minor]);
		this.CurrentField.focus();    
	}
	
	

	getCurrentTeeth()
	{
		for (var i = 0 ; i < 32 ; ++i)
		{
			if (this.Mandibula.Teeth[i].Id == parseInt(this.CurrentField.id.substr(0, 2)))
			{
				this.CurrentTeeth.asObject = this.Maxilla.Teeth[i];
				break;
			}
			else if (this.Maxilla.Teeth[i].Id == parseInt(this.CurrentField.id.substr(0, 2)))
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
			this.CurrentTeeth.asObject.id > 30 ? this.CurrentTeeth.asObject.draw(this.Mandibula.Context) :
				this.CurrentTeeth.asObject.draw(this.Maxilla.Context);
			return;
		}
		var t = this.getTeethById(id);
		t.Id > 30 ? t.draw(this.Mandibula.Context) : t.draw(this.Maxilla.Context);
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
		this.CurrentField = document.getElementById(TeethMajor[this.CurrentTeeth.major] + TeethMinor[this.CurrentTeeth.minor]);
		this.getCurrentTeeth();
	}
	
	updateCurrentTeeth()
	{vs
		this.setTeethOnClick();
		switch (TeethMinor[this.CurrentTeeth.minor])
		{
			case 'a':
				this.CurrentTeeth.asObject.m_ProbingDepth.a = this.CurrentField.value;
				break;
			case 'b':
				this.CurrentTeeth.asObject.m_ProbingDepth.b = this.CurrentField.value;
				break;
			case 'c':
				this.CurrentTeeth.asObject.m_ProbingDepth.c = this.CurrentField.value;
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
				e.addEventListener('focus', this.setTeethOnClick.bind(), false);
				e.addEventListener('change', this.updateCurrentTeeth.bind(), false);
				
				e = document.getElementById(TeethMajor[i] + TeethMinor[k]);
				e.addEventListener('focus', this.setTeethOnClick.bind(), false);
				e.addEventListener('change', this.updateCurrentTeeth.bind(), false);
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
						this.Charting.CurrentTeeth.minor = 0;
						this.Charting.getCurrentField();
						this.Charting.CurrentField.value = 0;
						
						this.Charting.CurrentTeeth.minor = 1;
						this.Charting.getCurrentField();
						this.Charting.CurrentField.value = 0;
						
						this.Charting.CurrentTeeth.minor = 2;
						this.Charting.getCurrentField();
						this.Charting.CurrentField.value = 0;
						
						this.Charting.CurrentTeeth.asObject.m_Exists = false;
						this.Charting.drawTooth();
						
						this.Charting.getNextTeeth();
						this.Charting.getCurrentField();
						this.Charting.getCurrentTeeth();
					}
					else if(parseInt(event.results[i][0].transcript) || 
							event.results[i][0].transcript.includes("un") ||
							event.results[i][0].transcript.includes("de"))
					{
						if (event.results[i][0].transcript.includes("un"))
						{
							this.Charting.CurrentField.value = 1;
							switch (TeethMinor[this.Charting.CurrentTeeth.minor])
							{
								case 'a':
									this.Charting.CurrentTeeth.asObject.m_ProbingDepth.a = 1;
									break;
								case 'b':
									this.Charting.CurrentTeeth.asObject.m_ProbingDepth.b = 1;
									break;
								case 'c':
									this.Charting.CurrentTeeth.asObject.m_ProbingDepth.c = 1;
									break;
								default:break;
							}
						}
						else if (event.results[i][0].transcript.includes("de"))
						{
							this.Charting.CurrentField.value = 1;
							switch (TeethMinor[this.Charting.CurrentTeeth.minor])
							{
								case 'a':
									this.Charting.CurrentTeeth.asObject.m_ProbingDepth.a = 2;
									break;
								case 'b':
									this.Charting.CurrentTeeth.asObject.m_ProbingDepth.b = 2;
									break;
								case 'c':
									this.Charting.CurrentTeeth.asObject.m_ProbingDepth.c = 2;
									break;
								default:break;
							}
						}
						else
						{
							this.Charting.CurrentField.value = parseInt(event.results[i][0].transcript);
							switch (TeethMinor[this.Charting.CurrentTeeth.minor])
							{
								case 'a':
									this.Charting.CurrentTeeth.asObject.m_ProbingDepth.a = parseInt(event.results[i][0].transcript);
									break;
								case 'b':
									this.Charting.CurrentTeeth.asObject.m_ProbingDepth.b = parseInt(event.results[i][0].transcript);
									break;
								case 'c':
									this.Charting.CurrentTeeth.asObject.m_ProbingDepth.c = parseInt(event.results[i][0].transcript);
									break;
								default:break;
							}
						}
						this.Charting.drawTooth();
						printf("Found teeth with ID : " + this.Charting.CurrentTeeth.asObject.Id + " for " + TeethMajor[this.Charting.CurrentTeeth.major] + " filling " + this.Charting.CurrentField.id + '\n');
						this.Charting.getNextTeeth();
						this.Charting.getCurrentField();
						this.Charting.getCurrentTeeth();
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
		document.getElementById('rec_icon').src = "icons/ic_settings_voice_red_24dp_2x.png";

		this.Charting.CurrentField.focus();
		this.Charting.getCurrentTeeth();
		this.Recognition.start();
	}
	stopRecognition()
	{
		document.getElementById('rec_icon').src = "icons/ic_settings_voice_black_24dp_2x.png";
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
                    this.Charting.getCurrentTeeth();
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
                    getCurrentTeeth();
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



//var dsp = new CRTDisplay();
//dsp.init();



function CRTDisplay()
{
    this.Canvas = document.getElementById('vrc_display');
    this.Context = this.Canvas.getContext('2d');
    this.m_LeftToLoad = 64;
    this.Canvas.width = 1632;
    this.Canvas.height = 478;

    this.Teeth = new Array(32);
    
    this.init = function()
    {
        this.m_CellWidth = this.Canvas.width / 16;
        this.m_CellHeight = this.Canvas.height / 2;
        
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
        for (var i = 31 ; i < 39 ; i++)
        {
            this.Teeth[i - 15] = new Teeth(i, m_CellWidth * (i-23), 239);
			
            this.Teeth[i - 15].m_ImgFront.src = "https://github.com/philippe-bachour/resources/raw/master/Dentistry/teeth/" + i + ".png"; 
            this.Teeth[i - 15].m_ImgLing.src = "https://github.com/philippe-bachour/resources/raw/master/Dentistry/teeth/" + i + "_L.png"; 
            this.Teeth[i - 15].m_ImgFront.onload = this.checkLoadState.bind(this); 
            this.Teeth[i - 15].m_ImgLing.onload = this.checkLoadState.bind(this); 
        }
        for (var i = 41 ; i < 49 ; i++)
        {
            this.Teeth[i - 17] = new Teeth(i, m_CellWidth * -(i - 48), 239);
			
            this.Teeth[i - 17].m_ImgFront.src = "https://github.com/philippe-bachour/resources/raw/master/Dentistry/teeth/" + i + ".png";
            this.Teeth[i - 17].m_ImgLing.src = "https://github.com/philippe-bachour/resources/raw/master/Dentistry/teeth/" + i + "_L.png";
            this.Teeth[i - 17].m_ImgFront.onload = this.checkLoadState.bind(this);
            this.Teeth[i - 17].m_ImgLing.onload = this.checkLoadState.bind(this);
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
		this.Context.fillStyle="#353535";
        this.Context.clearRect(0, 0, this.Canvas.width, this.Canvas.height);
        
        for (var i = 0 ; i < this.Teeth.length ; ++i)
        {
            this.Teeth[i].draw();
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
	\
	<div class="chart_title">Charting Parodontal</div>\
	<div class="flex_col" style="align-items: center;">\
		<table class="pdata_container">\
			<tr>\
				<td><label for="pFirstName">First name : </label></td><td><input id="pFirstName" type="text"></td>\
				<td><label for="pLastName">Last name : </label></td><td><input id="pLastName" type="text"></td>\
				<td><label for="pBirthDate">Birthdate : </label></td><td><input id="pBirthDate" type="text"></td>\
			</tr>\
			<tr>\
				<td><label for="pClinician">Clinician : </label></td><td><input id="pClinician" type="text"></td>\
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
			<div><label for="pDate">Date : </label><input id="pDate" type="text"></div>
		</div>-->
	</div>
    <p style="text-align:center;">\
        <span><img id="rec_icon" style="height:32px" src="icons/ic_settings_voice_black_24dp_2x.png"></span>\
        <input type="button" value="Start recognition" id="StartBut">\
        <input type="button" value="Stop recognition" id="StopBut"> \
        <select id="lang">\
            <option value="fr-FR" selected>Français</option>\
            <option value="en-US">English</option>\
        </select> \
    </p>\
    <table class="table"> \
        <tr> \
            <td class="table_title row_title">Dent</td>\
            <td class="table_title" colspan="3">18</td> \
            <td class="table_title" colspan="3">17</td> \
            <td class="table_title" colspan="3">16</td> \
            <td class="table_title" colspan="3">15</td> \
            <td class="table_title" colspan="3">14</td> \
            <td class="table_title" colspan="3">13</td> \
            <td class="table_title" colspan="3">12</td> \
            <td class="table_title" colspan="3">11</td> \
            <td class="table_title" colspan="3">21</td> \
            <td class="table_title" colspan="3">22</td> \
            <td class="table_title" colspan="3">23</td> \
            <td class="table_title" colspan="3">24</td> \
            <td class="table_title" colspan="3">25</td> \
            <td class="table_title" colspan="3">26</td> \
            <td class="table_title" colspan="3">27</td> \
            <td class="table_title" colspan="3">28</td> \
        </tr> \
        <tr> \
            <td class="table_title row_title">Poche</td>\
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
            <td class="table_title row_title">Poche</td>\
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
            <td class="table_title row_title">Dent</td>\
            <td class="table_title" colspan="3">18 L</td> \
            <td class="table_title" colspan="3">17 L</td> \
            <td class="table_title" colspan="3">16 L</td> \
            <td class="table_title" colspan="3">15 L</td> \
            <td class="table_title" colspan="3">14 L</td> \
            <td class="table_title" colspan="3">13 L</td> \
            <td class="table_title" colspan="3">12 L</td> \
            <td class="table_title" colspan="3">11 L</td> \
            <td class="table_title" colspan="3">21 L</td> \
            <td class="table_title" colspan="3">22 L</td> \
            <td class="table_title" colspan="3">23 L</td> \
            <td class="table_title" colspan="3">24 L</td> \
            <td class="table_title" colspan="3">25 L</td> \
            <td class="table_title" colspan="3">26 L</td> \
            <td class="table_title" colspan="3">27 L</td> \
            <td class="table_title" colspan="3">28 L</td> \
        </tr> \
        \
    </table>\
	<table class="table"> \
        <tr> \
            <td class="table_title row_title">Dent</td>\
            <td class="table_title" colspan="3">48</td> \
            <td class="table_title" colspan="3">47</td> \
            <td class="table_title" colspan="3">46</td> \
            <td class="table_title" colspan="3">45</td> \
            <td class="table_title" colspan="3">44</td> \
            <td class="table_title" colspan="3">43</td> \
            <td class="table_title" colspan="3">42</td> \
            <td class="table_title" colspan="3">41</td> \
            <td class="table_title" colspan="3">31</td> \
            <td class="table_title" colspan="3">32</td> \
            <td class="table_title" colspan="3">33</td> \
            <td class="table_title" colspan="3">34</td> \
            <td class="table_title" colspan="3">35</td> \
            <td class="table_title" colspan="3">36</td> \
            <td class="table_title" colspan="3">37</td> \
            <td class="table_title" colspan="3">38</td> \
        </tr> \
        <tr> \
            <td class="table_title row_title">Poche</td>\
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
            <td class="table_title row_title">Poche</td>\
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
            <td class="table_title row_title">Dent</td>\
            <td class="table_title" colspan="3">48 L</td> \
            <td class="table_title" colspan="3">47 L</td> \
            <td class="table_title" colspan="3">46 L</td> \
            <td class="table_title" colspan="3">45 L</td> \
            <td class="table_title" colspan="3">44 L</td> \
            <td class="table_title" colspan="3">43 L</td> \
            <td class="table_title" colspan="3">42 L</td> \
            <td class="table_title" colspan="3">41 L</td> \
            <td class="table_title" colspan="3">31 L</td> \
            <td class="table_title" colspan="3">32 L</td> \
            <td class="table_title" colspan="3">33 L</td> \
            <td class="table_title" colspan="3">34 L</td> \
            <td class="table_title" colspan="3">35 L</td> \
            <td class="table_title" colspan="3">36 L</td> \
            <td class="table_title" colspan="3">37 L</td> \
            <td class="table_title" colspan="3">38 L</td> \
        </tr> \
        \
    </table>\
    \
    <br>\
    <label>Debug output : </label><br>\
    <textarea rows="6" id="dbg" style="width:100%;max-width:100%;">\
    </textarea>\
    <br>\
    <br>\
    </div>';
}

