import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'График',
    },
  },
};

let axe: number[] = [0,1,2,3,4,5,6,7,8,9,10]
let labels = axe.map((x) => x.toString())
let step = 0.5
// const labels = ['1', '2', '3']

export const f1 = (x: number) => {
  if (Math.pow(x, (1/2)) === Infinity) {
      return x
  } else {
      return Math.pow(x, (1/2))
  }
}

export const f2 = (x: number) => {
  if (1/x === Infinity) {
      return x
  } else {
      return 1/x
  }
}

export const f3 = (x: number) => {
  if (Math.exp(x) === Infinity) {
      return x
  } else {
      return Math.exp(x)
  }
}

function App() {

  const [minAxe, setMinAxe] = React.useState<string>('')
  const [maxAxe, setMaxAxe] = React.useState<string>('')
  const [funs, setFuns] = React.useState<number[]>([])
  const [data, setData] = React.useState({
    labels,
    datasets: [
      {
        label: 'Dataset',
        data: axe.map((x) => {
          if (f1(x) === Infinity) {
            return x
          } else {
            return f1(x)
          }
        }),
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ],
  })

  const setNumber = (i: number) => {
    if (funs.includes(i)) {
      setFuns(prev => prev.filter(item => item !== i))
    } else {
      setFuns(prev => [...prev, i])
    }
  }

  const handleChangeData = () => {
    let data1 = axe
    let data2 = []
    if (minAxe && maxAxe) {
      if (minAxe !== '' && maxAxe !== '') {
        for(let i = parseFloat(minAxe); i <= parseFloat(maxAxe); i += step) {
          data2.push(i)
        }
        data1 = data2
      }
    }
    let order = funs
    while (order.length !== 0) {
      if (order[0] === 1) {
        data1 = data1.map((x) => f1(x))
      } else if (order[0] === 2) {
        data1 = data1.map((x) => f2(x))
      } else {
        data1 = data1.map((x) => f3(x))
      }
      order.shift()
    }
    setData({
      labels: data2.map(item => item.toFixed(2).toString()),
      datasets: [
        {
          label: 'Dataset',
          data: data1,
          borderColor: 'rgb(255, 99, 132)',
          backgroundColor: 'rgba(255, 99, 132, 0.5)',
        },
      ],
    })
  }

  return (
    <div className="flex flex-col justify-center">
      <div className='w-full flex flex-col gap-[10%] justify-center h-[50vh]'>
        <p className='flex justify-center'>Functions</p>
        <div className='w-full flex gap-[3%] justify-center'>
          <span style={{backgroundColor: funs.includes(1) ? 'rgb(243 244 246)' : 'white'}} onClick={() => setNumber(1)} className='w-[5%] border cursor-pointer'>
            <p className='text-center'>x<sup>1/2</sup></p>
          </span>
          <span style={{backgroundColor: funs.includes(2) ? 'rgb(243 244 246)' : 'white'}} onClick={() => setNumber(2)} className='w-[5%] border cursor-pointer'>
            <p className='text-center'>1/x</p>
          </span>
          <span style={{backgroundColor: funs.includes(3) ? 'rgb(243 244 246)' : 'white'}} onClick={() => setNumber(3)} className='w-[5%] border cursor-pointer'>
            <p className='text-center'>e<sup>x</sup></p>
          </span>
        </div>
        <span className='w-full flex gap-[3%] justify-center'>
          <p onClick={handleChangeData} className='flex justify-center cursor-pointer border w-[5%] hover:bg-gray-100'>build</p>
        </span>
        <div className='w-full flex gap-[3%] justify-center mt-5'>
          <input onChange={(e) => setMinAxe(e.target.value)} className='border w-[9%] flex' type="number" placeholder='min x' />
          <input onChange={(e) => setMaxAxe(e.target.value)} className='border w-[9%] flex' type="number" placeholder='max x' />
        </div>
      </div>
      <div className='w-full h-1/2 flex justify-center'>
        <div className='flex w-1/2'>
          <Line className='flex' options={options} data={data} />
        </div>
      </div>
    </div>
  );
}

export default App;
