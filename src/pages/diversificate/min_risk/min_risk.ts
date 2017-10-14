import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Http } from '@angular/http';


@Component({
  selector: 'page-min-risk',
  templateUrl: 'min_risk.html'
})
export class MinRiskPage {
  currency:any = ['CAD','CZK','GBP','HUF','JPY','PLZ','RUB','SKK','SEK','ILS','EUR','USD'];
  mainMatrix = new Array();
  uT = new Array();
  u = new Array();
  e = new Array();
  eT = new Array();
  T = new Array();
  w = new Array();
  wT = new Array();
  totalArr = new Array();
  get = new Array();

  show = false;
  risk;

  V;

  constructor(
  	public navCtrl: NavController,
    public http: Http
  	) {

  }

  onChange() {
  	console.log("currency ",this.currency);
  	this.getMAtrix();
  }

  getMAtrix() {
    this.mainMatrix = new Array();
    // console.log(date.getDay()+date.Month()+date.getFullYear());
    // for(let i=0; i<this.currency.length; i++) {
    	this.uT[i] = 1; 
    	this.T.push([2]);
    	let tempArr = [];
    	let link = 'https://serene-chamber-50995.herokuapp.com/api/generateMatrix/'+this.currency[i];
    // let link = 'http://localhost:5000/api/generateMatrix/'+this.currency[i];;

    	this.http.get(link).subscribe(async data => {

      let matrix = await data.json().curr;
 		  this.totalArr = await data.json().total;

      // console.log('matrix',matrix);
      // console.log('totalArr',this.totalArr);

 		  // console.log(data.json());

 		  this.e.push([this.totalArr[0].summa]);
 		  this.eT[i]=this.totalArr[0].summa;

      	for(let j = 0; j < matrix.length; j++) {
      		tempArr[matrix.length-j-1] = matrix[j].result;
      	}

      	this.mainMatrix.push(tempArr);

      	///////////////////////////////////////////////////////////////////////////
      	// this.mainMatrix = [
      	// 	[0.000289977,	0.000220737,	0.000180815,	0.000116276,	0.00013053],
      	// 	[0.000220737,	0.000303024,	0.000197764,	0.000117254,	0.00012509],
      	// 	[0.000180815,	0.000197764,	0.000348098,	0.000196227,	0.000216851],
      	// 	[0.000116276,	0.000117254,	0.000196227,	0.000477594,	0.000343725],
      	// 	[0.00013053,	0.00012509,	0.000216851,	0.000343725,	0.00046339],

      	// 	];
      	// 	this.u = [[1],[1],[1],[1],[1]];
      	// 	this.uT = [1,1,1,1,1];

      	// 	this.e = [[0.16],	[0.13],	[0.15],	[0.15],	[0.13]];
      	// 	this.eT = [0.16,	0.13,	0.15,	0.15,	0.13];
				 //////////////////////////////////////////////////////////////////////////


      if(this.currency.length-1 === i) {
      	
      setTimeout(() => {
        this.V = this.InverseMatrix(this.mainMatrix);
        // console.log("A_1",this.V);

        this.getG();
        this.getW();
      }, 300);
        
      }
   	 });
 		this.u.push([1]);
    // }
  }

 Determinant(A)   // Определитель матрицы (используется алгоритм Барейса)
{
    let N = A.length, B = [], denom = 1, exchanges = 0;
    for (let i = 0; i < N; ++i)
     { B[i] = [];
       for (let j = 0; j < N; ++j) B[i][j] = A[i][j];
     }
    for (let i = 0; i < N-1; ++i)
     { let maxN = i, maxValue = Math.abs(B[i][i]);
       for (let j = i+1; j < N; ++j)
        { let value = Math.abs(B[j][i]);
          if (value > maxValue){ maxN = j; maxValue = value; }
        }
       if (maxN > i)
        { let t = B[i]; B[i] = B[maxN]; B[maxN] = t;
          ++exchanges;
        }
       else { if (maxValue == 0) return maxValue; }
       let value1 = B[i][i];
       for (let j = i+1; j < N; ++j)
        { let value2 = B[j][i];
          B[j][i] = 0;
          for (let k = i+1; k < N; ++k) B[j][k] = (B[j][k]*value1-B[i][k]*value2)/denom;
        }
       denom = value1;
     }                                           //@ http://mathhelpplanet.com/viewtopic.php?f=44&t=22390
    if (exchanges%2) return -B[N-1][N-1];
    else return B[N-1][N-1];
}

 InverseMatrix(A)   // Обратная матрица
{
    let det = this.Determinant(A);
    if (det == 0) return false;
    let N = A.length, invA = [];
    for (let i = 0; i < N; i++)
     { invA[i] = [];
       for (let j = 0; j < N; j++)
        { let B = [], sign = ((i+j)%2==0) ? 1 : -1;
          for (let m = 0; m < j; m++)
           { B[m] = [];
             for (let n = 0; n < i; n++)   B[m][n] = A[m][n];
             for (let n = i+1; n < N; n++) B[m][n-1] = A[m][n];
           }
          for (let m = j+1; m < N; m++)
           { B[m-1] = [];
             for (let n = 0; n < i; n++)   B[m-1][n] = A[m][n];
             for (let n = i+1; n < N; n++) B[m-1][n-1] = A[m][n];
           }
          invA[i][j] = sign*this.Determinant(B)/det;
        }
     }
    return invA;
}

MultiplyMatrix(A,B)
{
    let rowsA = A.length, colsA = A[0].length,
        rowsB = B.length, colsB = B[0].length,
        C = [];

    if (colsA != rowsB) return false;
    for (let i = 0; i < rowsA; i++) C[i] = [];
    for (let k = 0; k < colsB; k++)
     { for (let i = 0; i < rowsA; i++)
        { let t = 0;
          for (let j = 0; j < rowsB; j++) t += A[i][j]*B[j][k];
          C[i][k] = t;
        }
     }
     // console.log("colsA",colsA);
     // console.log("rowsB",rowsB);

    return C;
}

getA(){
  let temp;
  let A;
  if(this.uT && this.V) {
    temp = this.MultiplyMatrix([this.uT], this.V); 
    A =  this.MultiplyMatrix(temp, this.e);
  }
  return A[0];
}

getB(){
  let temp;
  let B;
  if(this.eT && this.V) {
	  temp = this.MultiplyMatrix([this.eT], this.V);
	  B = this.MultiplyMatrix(temp, this.e);
  }
    return B[0];
}

getC(){
  let temp;
  let C;
  if(this.uT && this.V && this.u) {
	  temp = this.MultiplyMatrix([this.uT], this.V);
	  C = this.MultiplyMatrix(temp, this.u);
  }
	return C[0];
}

getD(){
	let A = this.getA();
	let B = this.getB();
	let C = this.getC();
	let temp1 = B*C;
	let temp2 = A*A;

	let D = temp1-temp2;

	return D;
}

getM(){
  let m;
  if(this.V && this.u) {
	  m = this.MultiplyMatrix(this.V, this.u);
  }
	// console.log("m",m);
	return m;
}

getL(){
	let l;
  if(this.uT && this.V && this.e) {
    l = this.MultiplyMatrix(this.V, this.e);
  }
	// console.log("l",l);
	return l;
}

multMatrixNumber(a,A)  // a - число, A - матрица (двумерный массив)
{   
    let m = A.length, n = A[0].length, B = [];
    for (let i = 0; i < m; i++)
     { B[i] = [];
       for (let j = 0; j < n; j++) B[i][j] = a*A[i][j];
     }
    return B;
}

minusMatrix(A,B)       //На входе двумерные массивы одинаковой размерности
{   
    let m = A.length, n = A[0].length, C = [];
    for (let i = 0; i < m; i++)
     { C[i] = [];
       for (let j = 0; j < n; j++) C[i][j] = A[i][j]-B[i][j];
     }
    // console.log('Joke_minus',  C);

    return C;
}

dilenjeMatrix(A,b)       //На входе двумерные массивы одинаковой размерности
{   
    let m = A.length, n = A[0].length, C = [];
    for (let i = 0; i < m; i++)
     { C[i] = [];
       for (let j = 0; j < n; j++) C[i][j] = A[i][j]/b;
     }
    // console.log('Joke_del',  C);

    return C;
}

SumMatrix(A,B)       //На входе двумерные массивы одинаковой размерности
{   
    let m = A.length, n = A[0].length, C = [];
    for (let i = 0; i < m; i++)
     { C[i] = [];
       for (let j = 0; j < n; j++) C[i][j] = A[i][j]+B[i][j];
     }
    return C;
}

getG(){
  console.log("mainMatrix",this.mainMatrix);
	let temp1:any = this.multMatrixNumber(this.getB(),this.getM());
	let temp2:any = this.multMatrixNumber(this.getA(),this.getL());
	let temp3:any = this.minusMatrix(temp1, temp2);

	let g = this.dilenjeMatrix(temp3,this.getD());

	return g;
}

getH(){
	let temp1:any = this.multMatrixNumber(this.getC(),this.getL());
	let temp2:any = this.multMatrixNumber(this.getA(),this.getM());
	let temp3:any = this.minusMatrix(temp1, temp2);

	let h = this.dilenjeMatrix(temp3,this.getD());

	return h;
}

getHT(A,B){
	let m = A.length, n = A[0].length, C = [];
    for (let i = 0; i < m; i++)
     { C[i] = [];
       for (let j = 0; j < n; j++) C[i][j] = A[i][j]*B[i][j];
     }

    return C;
}

getW(){
	let temp1:any = this.getHT(this.getH(),this.T);
	this.w = this.SumMatrix(this.getG(),temp1);
	this.show = true;
	console.log("w",this.w);
	this.getRisk();
	return this.w;
}

getRisk(){
  this.risk = 0;
  // let newW =new Array();
  for(let i=0; i<this.w.length; i++){
  	this.wT[i]=this.w[i][0];
  }

  let temp1:any = this.MultiplyMatrix([this.wT],this.mainMatrix);
  console.log('temp',temp1);
  this.risk = this.MultiplyMatrix(temp1,this.w);
  this.risk = Math.sqrt(this.risk);
  // console.log('risk!!!!!!!!!',Math.sqrt(this.risk));

  // console.log("risk",this.risk);
  // console.log("this.mainMatrix",this.mainMatrix);
  // console.log("newW",newW);
  // console.log("w",this.w);
  this.getMoney();
}

getMoney(){
	this.get[0]=0;
	for(let i = 0; i<this.totalArr.length; i++)
	  this.get[i] = +this.wT[i]*this.eT[i];

  // console.log("get",this.get);
}

}
