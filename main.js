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
var GingivalState = [
	"", "G"
];

function swap(array, e1, e2)
{
	var tmp = array[e2];
	array[e2] = array[e1]
	array[e1] = tmp;
}

function drawTeeth(id)
{
	var t = speech_ctl.Charting.getTeethById(id);
	if (id > 30)
		t.draw(speech_ctl.Charting.Mandibula.Context);
	else t.draw(speech_ctl.Charting.Maxilla.Context);
}

function getTeethOnRight(id)
{
	if (id > 30)
	{
		for (var i = 0 ; i < 15 ; i++)
			if (speech_ctl.Charting.Mandibula.Teeth[i].Id == id)
				return speech_ctl.Charting.Mandibula.Teeth[i + 1];
	}
	else
	{
		for (var i = 0 ; i < 15 ; i++)
			if (speech_ctl.Charting.Maxilla.Teeth[i].Id == id)
				return speech_ctl.Charting.Maxilla.Teeth[i + 1];
	}
	return 0;
};

function getTeethOnLeft(id)
{
	if (id > 30)
	{
		for (var i = 1 ; i <= 15 ; i++)
			if (speech_ctl.Charting.Mandibula.Teeth[i].Id == id)
				return speech_ctl.Charting.Mandibula.Teeth[i - 1];
	}
	else
	{
		for (var i = 1 ; i <= 15 ; i++)
			if (speech_ctl.Charting.Maxilla.Teeth[i].Id == id)
				return speech_ctl.Charting.Maxilla.Teeth[i - 1];
	}
	return 0;
};

/**===================================================================================================*/

class ChartRenderer
{
	constructor(arc)
	{
		this.Teeth = new Array(16);
		this.leftToLoad = 32;
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
				this.Canvas.width = 1632;
				this.Canvas.height = 478;
				this.Context = this.Canvas.getContext('2d');
				
				var m_CellWidth = this.Canvas.width / 16;
				var m_CellHeight = this.Canvas.height / 2;

				var fake = new Array(8);
				
				for (var i = 11 ; i < 19 ; i++)
				{
					this.Teeth[i - 11] = new Teeth(i, m_CellWidth * - (i - 18), 0);

					this.Teeth[i - 11].m_ImgFront.src = "https://github.com/philippe-bachour/resources/raw/master/Dentistry/teeth/" + i + ".png";
					this.Teeth[i - 11].m_ImgImplantFront.src = "https://github.com/philippe-bachour/resources/raw/master/Dentistry/implants/" + i + ".png";
					this.Teeth[i - 11].m_ImgImplantLing.src = "https://github.com/philippe-bachour/resources/raw/master/Dentistry/implants/" + i + "_L.png";
					this.Teeth[i - 11].m_ImgLing.src = "https://github.com/philippe-bachour/resources/raw/master/Dentistry/teeth/" + i + "_L.png";
					this.Teeth[i - 11].m_ImgFront.onload = this.checkLoadState.bind(this);
					this.Teeth[i - 11].m_ImgLing.onload = this.checkLoadState.bind(this);
				}
				for (var i = 21 ; i < 29 ; i++)
				{
					this.Teeth[i - 13] = new Teeth(i, m_CellWidth * (i-13), 0);
					
					this.Teeth[i - 13].m_ImgFront.src = "https://github.com/philippe-bachour/resources/raw/master/Dentistry/teeth/" + i + ".png";
					this.Teeth[i - 13].m_ImgImplantFront.src = "https://github.com/philippe-bachour/resources/raw/master/Dentistry/implants/" + i + ".png";
					this.Teeth[i - 13].m_ImgImplantLing.src = "https://github.com/philippe-bachour/resources/raw/master/Dentistry/implants/" + i + "_L.png";
					this.Teeth[i - 13].m_ImgLing.src = "https://github.com/philippe-bachour/resources/raw/master/Dentistry/teeth/" + i + "_L.png";
					this.Teeth[i - 13].m_ImgFront.onload = this.checkLoadState.bind(this); 
					this.Teeth[i - 13].m_ImgLing.onload = this.checkLoadState.bind(this); 
				}

				swap(this.Teeth, 0, 7);
				swap(this.Teeth, 1, 6);
				swap(this.Teeth, 2, 5);
				swap(this.Teeth, 3, 4);

				break;
			}
			case 'lower':
			{
				this.Canvas = document.getElementById('vrc_display1');
				this.Canvas.width = 1632;
				this.Canvas.height = 478;
				this.Context = this.Canvas.getContext('2d');
				
				var m_CellWidth = this.Canvas.width / 16;
				var m_CellHeight = this.Canvas.height / 2;
				
				for (var i = 41 ; i < 49 ; i++)
				{
					this.Teeth[i - 41] = new Teeth(i, m_CellWidth * -(i - 48), 0);

					this.Teeth[i - 41].m_ImgFront.src = "https://github.com/philippe-bachour/resources/raw/master/Dentistry/teeth/" + i + ".png";
					this.Teeth[i - 41].m_ImgImplantFront.src = "https://github.com/philippe-bachour/resources/raw/master/Dentistry/implants/" + i + ".png";
					this.Teeth[i - 41].m_ImgImplantLing.src = "https://github.com/philippe-bachour/resources/raw/master/Dentistry/implants/" + i + "_L.png";
					this.Teeth[i - 41].m_ImgLing.src = "https://github.com/philippe-bachour/resources/raw/master/Dentistry/teeth/" + i + "_L.png";
					this.Teeth[i - 41].m_ImgFront.onload = this.checkLoadState.bind(this);
					this.Teeth[i - 41].m_ImgLing.onload = this.checkLoadState.bind(this);
				}
				for (var i = 31 ; i < 39 ; i++)
				{
					this.Teeth[i - 23] = new Teeth(i, m_CellWidth * (i-23), 0);
					
					this.Teeth[i - 23].m_ImgFront.src = "https://github.com/philippe-bachour/resources/raw/master/Dentistry/teeth/" + i + ".png"; 
					this.Teeth[i - 23].m_ImgImplantFront.src = "https://github.com/philippe-bachour/resources/raw/master/Dentistry/implants/" + i + ".png";
					this.Teeth[i - 23].m_ImgImplantLing.src = "https://github.com/philippe-bachour/resources/raw/master/Dentistry/implants/" + i + "_L.png";
					this.Teeth[i - 23].m_ImgLing.src = "https://github.com/philippe-bachour/resources/raw/master/Dentistry/teeth/" + i + "_L.png"; 
					this.Teeth[i - 23].m_ImgFront.onload = this.checkLoadState.bind(this); 
					this.Teeth[i - 23].m_ImgLing.onload = this.checkLoadState.bind(this); 
				}

				swap(this.Teeth, 0, 7);
				swap(this.Teeth, 1, 6);
				swap(this.Teeth, 2, 5);
				swap(this.Teeth, 3, 4);

				break;
			}
			default:break;

		}
		this.Canvas.addEventListener('click', this.clickDown.bind(this), false);

	}

	clickDown(e)
	{
		var rect = this.Canvas.getBoundingClientRect();
		var num = Math.floor(((e.clientX - rect.left) / rect.width) * 16);

		this.Teeth[num].m_Exists = !this.Teeth[num].m_Exists;
		this.Teeth[num].draw(this.Context);

		angular.element(document.getElementById('main_controller')).scope().$apply();
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
		var startTime = performance.now();

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

        var end = performance.now();
        console.log('Frame time : ' + Math.round((end - startTime) * 1000) + 'µs');
	}
}


class Teeth
{
	constructor(id, posx, posy)
    {
		this.m_Exists = true;
		this.m_Implant = false;
		this.Id = id;
		
		this.m_ProbingDepth = { a:0 , b:0 , c:0 };
		this.m_ProbingDepthL = { a:0 , b:0 , c:0 };
		this.m_GingivalMargin = { a:0 , b:0 , c:0 };
		this.m_GingivalMarginL = { a:0 , b:0 , c:0 };
		
		this.m_ImgFront = new Image();
		this.m_ImgLing = new Image();
		this.m_ImgImplantFront = new Image();
		this.m_ImgImplantLing = new Image();
		this.m_Rect = { x:posx, y:posy, w:102, h:239 };

		this.m_BleedOnProbing = {a:false , b:false , c:false};
		this.m_HasPlaque = {a:false , b:false , c:false};
		this.m_BleedOnProbingL = {a:false , b:false , c:false};
		this.m_HasPlaqueL = {a:false , b:false , c:false};

		this.offset = (this.Id > 30) ? 135 : 105;
        this.sign = (this.Id > 30) ? 1 : -1;
	}
    drawImages(ctx, view)
	{
		if (this.m_Implant)
		{
			ctx.drawImage(this.m_ImgImplantFront, this.m_Rect.x, this.m_Rect.y);
			ctx.drawImage(this.m_ImgImplantLing, this.m_Rect.x, this.m_Rect.y + this.m_Rect.h);
		}
        else
		{
			ctx.drawImage(this.m_ImgFront, this.m_Rect.x, this.m_Rect.y);
			ctx.drawImage(this.m_ImgLing, this.m_Rect.x, this.m_Rect.y + this.m_Rect.h);
		}
	}
	clearRect(ctx, view)
	{
		ctx.clearRect(this.m_Rect.x, this.m_Rect.y, this.m_Rect.w, this.m_Rect.h * 2);
	}
	drawLines(ctx, view)
	{
		ctx.beginPath();
		var left = getTeethOnLeft(this.Id);
		var right = getTeethOnRight(this.Id);
		var sg_hg = this.sign * speech_ctl.Charting.HEIGHT_STEP;
		var x_1_4 = this.m_Rect.x + this.m_Rect.w * 1 / 4;
		var x_2 = this.m_Rect.x + this.m_Rect.w / 2;
		var x_3_4 = this.m_Rect.x + this.m_Rect.w * 3 / 4;
		var Top_V = this.m_Rect.y + this.m_Rect.h - this.offset;
		var Top_L = this.m_Rect.y + this.m_Rect.h * 2 - this.offset;
		
		if(left != 0 && left.m_Exists)
		{
			ctx.moveTo(left.m_Rect.x + left.m_Rect.w * 3 / 4, (left.m_Rect.y + left.m_Rect.h - this.offset) + 
				(left.m_ProbingDepth.c + left.m_GingivalMargin.c) * sg_hg);
			ctx.lineTo(x_1_4, (Top_V) + (this.m_ProbingDepth.a + this.m_GingivalMargin.a) * sg_hg);
		}
		else
			ctx.moveTo(x_1_4, (Top_V) + (this.m_ProbingDepth.a + this.m_GingivalMargin.a) * sg_hg);
		ctx.lineTo(x_2, (Top_V) + (this.m_ProbingDepth.b + this.m_GingivalMargin.b) * sg_hg);
		ctx.lineTo(x_3_4, (Top_V) + (this.m_ProbingDepth.c + this.m_GingivalMargin.c) * sg_hg);

		if(right != 0 && right.m_Exists)
		{
			ctx.lineTo(right.m_Rect.x + right.m_Rect.w * 1 / 4, (right.m_Rect.y + right.m_Rect.h - this.offset) + 
				(right.m_ProbingDepth.a + right.m_GingivalMargin.a) * sg_hg);
		}

		ctx.lineWidth = 2;
        ctx.strokeStyle = speech_ctl.Charting.PDColor;
        ctx.stroke();
		
		ctx.beginPath();
		
		if(left != 0 && left.m_Exists)
		{
			ctx.moveTo(left.m_Rect.x + left.m_Rect.w * 3 / 4, (left.m_Rect.y + left.m_Rect.h - this.offset) + 
				(left.m_GingivalMargin.c) * sg_hg);
			ctx.lineTo(x_1_4, (Top_V) + (this.m_GingivalMargin.a) * sg_hg);
		}
        else ctx.moveTo(x_1_4, (Top_V) + (this.m_GingivalMargin.a) * sg_hg);
		ctx.lineTo(x_2, (Top_V) + (this.m_GingivalMargin.b) * sg_hg);
		ctx.lineTo(x_3_4, (Top_V) + (this.m_GingivalMargin.c) * sg_hg);

		if(right != 0 && right.m_Exists)
		{
			ctx.lineTo(right.m_Rect.x + right.m_Rect.w * 1 / 4, (right.m_Rect.y + right.m_Rect.h - this.offset) + 
				(right.m_GingivalMargin.a) * sg_hg);
		}

		ctx.lineWidth = 2;
        ctx.strokeStyle = speech_ctl.Charting.GMColor;
        ctx.stroke();
		
		
		/*--------------------BACK VIEW------------------------*/
		ctx.beginPath();
		left = getTeethOnLeft(this.Id);
		right = getTeethOnRight(this.Id);
		
		if(left != 0 && left.m_Exists)
		{
			ctx.moveTo(left.m_Rect.x + left.m_Rect.w * 3 / 4, (left.m_Rect.y + left.m_Rect.h * 2 - this.offset) + 
				(left.m_ProbingDepthL.c + left.m_GingivalMarginL.c) * sg_hg);
			ctx.lineTo(x_1_4, (Top_L) + (this.m_ProbingDepthL.a + this.m_GingivalMarginL.a) * sg_hg);
		}
		else ctx.moveTo(x_1_4, (Top_L) + (this.m_ProbingDepthL.a + this.m_GingivalMarginL.a) * sg_hg);
		ctx.lineTo(x_2, (Top_L) + (this.m_ProbingDepthL.b + this.m_GingivalMarginL.b) * sg_hg);
		ctx.lineTo(x_3_4, (Top_L) + (this.m_ProbingDepthL.c + this.m_GingivalMarginL.c) * sg_hg);

		if(right != 0 && right.m_Exists)
		{
			ctx.lineTo(right.m_Rect.x + right.m_Rect.w * 1 / 4, (right.m_Rect.y + right.m_Rect.h * 2 - this.offset) + 
				(right.m_ProbingDepthL.a + right.m_GingivalMarginL.a) * sg_hg);
		}

		ctx.lineWidth = 2;
        ctx.strokeStyle = speech_ctl.Charting.PDColor;
        ctx.stroke();
		
		ctx.beginPath();
		if(left != 0 && left.m_Exists)
		{
			ctx.moveTo(left.m_Rect.x + left.m_Rect.w * 3 / 4, (left.m_Rect.y + left.m_Rect.h * 2 - this.offset) + 
				(left.m_GingivalMarginL.c) * sg_hg);
			ctx.lineTo(x_1_4, (Top_L) + (this.m_GingivalMarginL.a) * sg_hg);
		}
        else ctx.moveTo(x_1_4, (Top_L) + (this.m_GingivalMarginL.a) * sg_hg);
		ctx.lineTo(x_2, (Top_L) + (this.m_GingivalMarginL.b) * sg_hg);
		ctx.lineTo(x_3_4, (Top_L) + (this.m_GingivalMarginL.c) * sg_hg);

		if(right != 0 && right.m_Exists)
		{
			ctx.lineTo(right.m_Rect.x + right.m_Rect.w * 1 / 4, (right.m_Rect.y + right.m_Rect.h * 2 - this.offset) + 
				(right.m_GingivalMarginL.a) * sg_hg);
		}

		ctx.lineWidth = 2;
        ctx.strokeStyle = speech_ctl.Charting.GMColor;
        ctx.stroke();
	}
    
    draw(ctx, view)
    {
		var left = getTeethOnLeft(this.Id);
		var right = getTeethOnRight(this.Id);
		if (left)
		{
			left.clearRect(ctx, view);
			if(left.m_Exists)
				left.drawImages(ctx, view);
		}	
		if (right)
		{
			right.clearRect(ctx, view);
			if(right.m_Exists)
				right.drawImages(ctx, view);
		}
        this.clearRect(ctx, view);

		if (this.m_Exists)
        {
			this.drawImages(ctx, view);
			this.drawLines(ctx, view);	
        }
		if (left && left.m_Exists)
			left.drawLines(ctx, view);
		if (right && right.m_Exists)
			right.drawLines(ctx, view);
    }
}

class Charting
{
	constructor()
	{
		this.Maxilla = new ChartRenderer('upper');
		this.Mandibula = new ChartRenderer('lower');
		this.CurrentTeeth = {major:0,minor:0,face:0,asObject:-1,gingival:0};
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
	
	computeStatistics()
	{

	}

	computeGlobalPocketDepth()
	{

	}

	computePocketDepth()
	{
		var max;
		var min;

		for (var i = 0 ; i < 16 ; ++i)
		{
			if (this.Maxilla.Teeth[i].m_HasPlaque.a) max++;
			if (this.Maxilla.Teeth[i].m_HasPlaque.b) max++;
			if (this.Maxilla.Teeth[i].m_HasPlaque.c) max++;
			if (this.Mandibula.Teeth[i].m_HasPlaque.a) max++;
			if (this.Mandibula.Teeth[i].m_HasPlaque.b) max++;
			if (this.Mandibula.Teeth[i].m_HasPlaque.c) max++;
		}

		alert(max);
	}

	getTeethById(id)
	{
		for (var i = 0 ; i < this.Maxilla.Teeth.length ; ++i)
		{
			if (this.Maxilla.Teeth[i].Id == id)
				return this.Maxilla.Teeth[i];
			else if (this.Mandibula.Teeth[i].Id == id)
				return this.Mandibula.Teeth[i];
		}
	}

	getPrevTeeth(id)
	{
		if (id <= 18 && id > 11)
			return this.getTeethById(id - 1);
		else if (id > 21 && id < 29)
			return this.getTeethById(id - 1);
		else if (id <= 48 && id > 41)
			return this.getTeethById(id - 1)
		else if (id > 31 && id < 39)
			return this.getTeethById(id - 1);
		else if (id == 11) return this.getTeethById(21);
		else if (id == 41) return this.getTeethById(31);
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
			GingivalState[this.CurrentTeeth.gingival] + 
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
					case 'G' :
					{
						this.CurrentTeeth.gingival = 1;
						switch(document.activeElement.id.substr(4, 1))
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
						this.CurrentTeeth.gingival = 0;
						this.CurrentTeeth.minor = 0;
						break;
					case 'b' :
						this.CurrentTeeth.gingival = 0;
						this.CurrentTeeth.minor = 1;
						break;
					case 'c' :
						this.CurrentTeeth.gingival = 0;
						this.CurrentTeeth.minor = 2;
						break;
				}
				break;
			}
			case 'G' :
			{
				this.CurrentTeeth.face = 0;
				this.CurrentTeeth.gingival = 1;
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
				this.CurrentTeeth.gingival = 0;
				break;
			case 'b' :
				this.CurrentTeeth.minor = 1;
				this.CurrentTeeth.face = 0;
				this.CurrentTeeth.gingival = 0;
				break;
			case 'c' :		
				this.CurrentTeeth.minor = 2;
				this.CurrentTeeth.face = 0;
				this.CurrentTeeth.gingival = 0;
				break;
		}
		this.CurrentField = document.getElementById(TeethMajor[this.CurrentTeeth.major] + TeethFace[this.CurrentTeeth.face] 
			+ GingivalState[this.CurrentTeeth.gingival] + TeethMinor[this.CurrentTeeth.minor]);
		this.getCurrentToothAsObject();
	}
	
	setCurrentToothValue(value)
	{
		var target;
		if (this.CurrentField.id.indexOf('G') > -1)
		{
			target = (this.CurrentTeeth.face ? 
				this.CurrentTeeth.asObject.m_GingivalMarginL : this.CurrentTeeth.asObject.m_GingivalMargin);
		}
		else
		{
			target = (this.CurrentTeeth.face ? 
				this.CurrentTeeth.asObject.m_ProbingDepthL : this.CurrentTeeth.asObject.m_ProbingDepth);
		}
		
		switch(TeethMinor[this.CurrentTeeth.minor])
		{
			case 'a':
				target.a = parseInt(this.CurrentField.value);
				break;
			case 'b':
				target.b = parseInt(this.CurrentField.value);
				break;
			case 'c':
				target.c = parseInt(this.CurrentField.value);
				break;
			default:break;
		}	
		this.drawTooth();
	}
	
	updateCurrentTeeth()
	{
		this.setTeethOnClick();

		if (this.CurrentField.id.indexOf('G') != -1)
		{
			switch (TeethMinor[this.CurrentTeeth.minor])
			{
				case 'a':
					if (this.CurrentTeeth.face)
						this.CurrentTeeth.asObject.m_GingivalMarginL.a = parseInt(this.CurrentField.value);
					else this.CurrentTeeth.asObject.m_GingivalMargin.a = parseInt(this.CurrentField.value);
					break;
				case 'b':
					if (this.CurrentTeeth.face)
						this.CurrentTeeth.asObject.m_GingivalMarginL.b = parseInt(this.CurrentField.value);
					else this.CurrentTeeth.asObject.m_GingivalMargin.b = parseInt(this.CurrentField.value);
					break;
				case 'c':
					if (this.CurrentTeeth.face)
						this.CurrentTeeth.asObject.m_GingivalMarginL.c = parseInt(this.CurrentField.value);
					else this.CurrentTeeth.asObject.m_GingivalMargin.c = parseInt(this.CurrentField.value);
					break;
				default:break;
			}	
		}	
		else
		{
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
		}
		this.drawTooth();
	}
	
	toggleImplant(tooth)
	{
		var q = document.getElementById('impl' + tooth);
		var t = this.getTeethById(tooth);
		if (q.checked)
		{
			t.m_Implant = true;
		}
		else
		{
			t.m_Implant = false;
		}
		this.drawTooth(tooth);
	}

	addInputEvListeners()
	{
		/*
		for (var i = 0 ; i < TeethMajor.length ; ++i)
		{
			for (var k = 0 ; k < 3 ; ++k)
			{
				var e;
				e = document.getElementById(TeethMajor[i] + TeethMinor[k]);
				e.addEventListener('focus', this.setTeethOnClick.bind(this), false);
				e.addEventListener('change', this.updateCurrentTeeth.bind(this), false);
				
				e = document.getElementById(TeethMajor[i] + 'L' + TeethMinor[k]);
				e.addEventListener('focus', this.setTeethOnClick.bind(this), false);
				e.addEventListener('change', this.updateCurrentTeeth.bind(this), false);

				e = document.getElementById(TeethMajor[i] + 'G' + TeethMinor[k]);
				e.addEventListener('focus', this.setTeethOnClick.bind(this), false);
				e.addEventListener('change', this.updateCurrentTeeth.bind(this), false);

				e = document.getElementById(TeethMajor[i] + 'LG' + TeethMinor[k]);
				e.addEventListener('focus', this.setTeethOnClick.bind(this), false);
				e.addEventListener('change', this.updateCurrentTeeth.bind(this), false);

				//plaque & probing
				e = document.getElementById('plq' + TeethMajor[i] + 'a');
				e.addEventListener('change', this.togglePlaque.bind(this, TeethMajor[i], 'a'), false);
				e = document.getElementById('plq' + TeethMajor[i] + 'b');
				e.addEventListener('change', this.togglePlaque.bind(this, TeethMajor[i], 'b'), false);
				e = document.getElementById('plq' + TeethMajor[i] + 'c');
				e.addEventListener('change', this.togglePlaque.bind(this, TeethMajor[i], 'c'), false);
			}
			document.getElementById('impl' + TeethMajor[i]).addEventListener('click', this.toggleImplant.bind(this, TeethMajor[i]), false);
			
		}
		
		var q = document.getElementsByClassName("box");
		for (var i = 0 ; i < q.length ; ++i)
		{
			q[i].addEventListener('click', this.cycle_furcState.bind(this, q[i]), false);
		}
		//document.getElementById('furca' + TeethMajor[i]).addEventListener('click', this.cycle_furcState.bind(this, TeethMajor[i]), false);
		*/
	}

	togglePlaque(majorid, subelement)
	{
		var tooth = this.getTeethById(parseInt(majorid));
		switch(subelement)
		{
			case 'a':
				tooth.m_HasPlaque.a = !tooth.m_HasPlaque.a;
				break;
			case 'b':
				tooth.m_HasPlaque.b = !tooth.m_HasPlaque.b;
				break;
			case 'c':
				tooth.m_HasPlaque.c = !tooth.m_HasPlaque.c;
				break;
		}
	}
	
	cycle_furcState(tooth)
	{
		var e = document.getElementById('furca' + tooth);
		if(e.classList.contains("half_fill"))
			e.className = "box fill";
		else if (e.classList.contains("fill"))
			e.className = "box";
		else e.className = "box half_fill";
	}
}

class SpeechController
{
	constructor()
	{
		this.DICTIONNARY = { Missing:__dictionnary.rec_missing,
			StopReco:__dictionnary.stop_recognition,
			Tooth:__dictionnary.tooth };
		this.final_transcript = '';
		this.Recognition = 0;
		this.Charting = 0;
	}
	
	initialise()
	{		
		this.Charting = new Charting();

		this.Charting.initialise();
		
		document.getElementById('refresh_bt').addEventListener("click", function(){
				speech_ctl.Charting.Maxilla.drawBackground();
				speech_ctl.Charting.Mandibula.drawBackground();
			}, false);
	
		/* Generate tables, and buttons event listeners */
		
		document.getElementById('StartBut').addEventListener("click", this.startRecognition.bind(this), false);
		document.getElementById('StopBut').addEventListener("click", this.stopRecognition.bind(this), false);
		
		/* Initialise SpeechRecognition */
		
		if (!('webkitSpeechRecognition' in window))
		{
			document.getElementById('speech_ui').innerHTML = __dictionnary.no_speech_support;
			//printf("Speech API not supported by your browser, you must use Chrome version 25 or later.");
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
			this.Recognition.lang = __dictionnary.lang;
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
			}.bind(this);
			this.Recognition.onresult = function(event)
			{
				for (var i = event.resultIndex ; i < event.results.length ; ++i)
				{
					var transcript = event.results[i][0].transcript
					if(transcript.indexOf(' ') == 0)
						transcript = transcript.substring(1);
					document.getElementById('debug').innerHTML = transcript;
					if(!isNaN(parseInt(transcript)))
					{						
						this.Charting.CurrentField.value = parseInt(transcript);
						this.Charting.setCurrentToothValue(parseInt(transcript));
						
						//this.Charting.drawTooth();
						//printf("Found teeth with ID : " + this.Charting.CurrentTeeth.asObject.Id + " for " + TeethMajor[this.Charting.CurrentTeeth.major] + " filling " + this.Charting.CurrentField.id + '\n');
						this.Charting.getNextTeeth();
						this.Charting.getCurrentField();
						this.Charting.getCurrentToothAsObject();
					}
					else if (transcript.indexOf(this.DICTIONNARY.StopReco) > -1)
					{
						this.stopRecognition();
					}
					else if (transcript.indexOf(this.DICTIONNARY.Tooth) > -1)
					{
						
					}
					else if (transcript == __dictionnary.rec_missing)
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
					else if (transcript == __dictionnary.rec_implant)
					{
						this.Charting.CurrentTeeth.asObject.m_Implant = true;
						this.Charting.drawTooth();
					}
					else
					{
						//printf("Unknown transcript : " + event.results[i][0].transcript);
					}
					console.log(transcript);
				}
			}.bind(this);
			this.Recognition.onnomatch = function(event)
			{
				//printf('No command string matching what you said.\n');
			}.bind(this);
			this.Recognition.onerror = function(event) 
			{
			
			}.bind(this);
			this.Recognition.onend = function()
			{
			
			}.bind(this);
		}
	}
	
	startRecognition(event)
	{
		this.final_transcript = '';
		document.getElementById('rec_icon').src = "icons/ic_settings_voice_red_24dp_2x.png";

		if (!this.Charting.CurrentField)
			this.Charting.getCurrentField();
		else this.Charting.CurrentField.focus();
		this.Charting.getCurrentToothAsObject();
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
//peech_ctl.Charting.initialise();

//startup();


function startup()
{    
    generatePageContent();
    
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
                if (event.results[i][0].transcript == __dictionnary.stop_recognition)
                {
                    this.Recognition.stop();
                }
                else if (event.results[i][0].transcript.includes(__dictionnary.tooth))
                {
                    
				}
				else if (event.results[i][0].transcript == __dictionnary.implant)
				{
					this.Charting.getCurrentToothAsObject();
					this.Charting.CurrentTeeth.m_Implant = true;
				}
                else if (event.results[i][0].transcript == __dictionnary.stop_recognition)
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
                else
                    printf("Unknown transcript : " + event.results[i][0].transcript);
            }
        };
        this.Recognition.onnomatch = function(event)
        {
            
        };
        this.Recognition.onerror = function(event) 
        {
        
        };
        this.Recognition.onend = function()
        {
        
        };
    }
    
    //addInputEvListeners();
}

function generatePageContent()
{
    /*document.getElementById('vr_charting').innerHTML = '<div class="no-print">Commandes vocales :<br>\
    <ul>\
        <li>"stop" : arrêter la reconnaissance</li>\
        <li>"absente" : dent absente</li>\
        <li>dites un nombre pour remplir la case ayant le focus</li>\
    </ul>\
    <p>Vous pouvez également entrer des valeurs directement dans les champs au clavier</p>\
    <p>Cliquez sur un input pour définir la case de départ</p>\
	</div>\
    <br>';*/
}

