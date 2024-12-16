"use client"
import {useState, ChangeEvent} from 'react';
import { Card,CardHeader,CardTitle,CardDescription,CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface BmiResult{
    bmi:string;
    category:string;
}

export default function BmiCalculator(){
    const [height,setHeight] = useState<string>("");
    const [weight,setWeight] = useState<string>("");
    const [result,setResult] = useState<BmiResult | null >(null);
    const [error,setError] = useState<string>("");
    const handleHeightChange = (e: ChangeEvent<HTMLInputElement>): void=>{
        setHeight(e.target.value);
    };
    const handleWeightChange = (e: ChangeEvent<HTMLInputElement>):void=>{
        setWeight(e.target.value);
    };
    const calculateBmi =():void =>{
      if(!height || !weight){
        setError("Please enter both height and weight.");
        return;
      }  
    const heightInMeter=parseFloat(height)/100
      if(heightInMeter<=0){
        setError("Height should be a positive number.");
        return;
      } 
    const weightInKg=parseFloat(weight);
    if(weightInKg<=0){
        setError("Weight should be a positive number.");
        return;
    }  
    const bmiValue = weightInKg / (heightInMeter*heightInMeter);
    let category= "";
    if(bmiValue < 18.5){
        category = "UnderWeight";
    }
    else if(bmiValue>=18.5 && bmiValue<25){
        category = "Normal";
    }
    else if(bmiValue>=25 && bmiValue<30){
        category = "OverWeight";
    }
    else{
        category = "Obese";
    }
    setResult({ bmi: bmiValue.toFixed(1),category});
    setError("");
}
  return(
    <div className='flex flex-col items-center justify-center min-h-screen bg-blue-300 dark:bg-gray-900 '>
        <Card className='w-full max-w-md mx-auto'>
            <CardHeader>
                <CardContent className='font-bold text-2xl pl-2'>BMI Calculator</CardContent>
                <CardDescription >Enter your height and weight to calculate BMI</CardDescription>
            </CardHeader>
            <CardContent className='space-y-4'>
                <div className='grid gap-2'>
                    <Label htmlFor='height' className='font-bold '>Height (cm)</Label>
                    <Input
                    id='height'
                    type='number'
                    placeholder='Enter your height'
                    value={height}
                    onChange={handleHeightChange}
                    />
                </div>
                <div className='grid gap-2'>
                    <Label htmlFor='weight'  className='font-bold '>Weight (kg)</Label>
                    <Input
                    id='weight'
                    type='number'
                    placeholder='Enter your weight'
                    value={weight}
                    onChange={handleWeightChange}
                    />
                </div>
                <Button onClick={calculateBmi}>Calculate</Button>
                {error && <div className='text-red-500 text-center'>{error}</div>}
                {result &&(
                    <div className='grid gap-2'>
                        <div className='text-center text-2xl font-bold'>{result.bmi}</div>
                        <div className='text-center text-muted-foreground'>
                            {result.category}
                        </div>
                    </div>
                )}
            </CardContent>
        </Card>
    </div>
  );


}
