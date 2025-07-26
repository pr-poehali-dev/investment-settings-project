import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import Icon from '@/components/ui/icon';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';

// Trading Chart Component
const TradingChart = () => {
  const data = [
    { time: '09:00', price: 180.25 },
    { time: '10:00', price: 182.40 },
    { time: '11:00', price: 179.80 },
    { time: '12:00', price: 185.60 },
    { time: '13:00', price: 188.30 },
    { time: '14:00', price: 186.90 },
    { time: '15:00', price: 191.20 },
    { time: '16:00', price: 189.75 }
  ];

  return (
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <XAxis 
            dataKey="time" 
            axisLine={false}
            tickLine={false}
            tick={{ fill: '#9CA3AF', fontSize: 12 }}
          />
          <YAxis 
            axisLine={false}
            tickLine={false}
            tick={{ fill: '#9CA3AF', fontSize: 12 }}
            domain={['dataMin - 5', 'dataMax + 5']}
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: '#1A1A1A', 
              border: '1px solid #374151',
              borderRadius: '8px',
              color: '#fff'
            }}
            labelStyle={{ color: '#9CA3AF' }}
          />
          <Line 
            type="monotone" 
            dataKey="price" 
            stroke="#00D4AA" 
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 4, fill: '#00D4AA' }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

const Index = () => {
  const [isRealMoney, setIsRealMoney] = useState(false);
  const [balance] = useState({
    real: 25000,
    practice: 100000
  });

  const portfolioData = [
    { name: 'AAPL', value: 15420, change: 2.3, percentage: 30 },
    { name: 'TSLA', value: 8750, change: -1.2, percentage: 20 },
    { name: 'GOOGL', value: 12300, change: 0.8, percentage: 25 },
    { name: 'MSFT', value: 9200, change: 1.5, percentage: 18 },
    { name: 'NVDA', value: 3500, change: 4.2, percentage: 7 }
  ];

  const learningSteps = [
    {
      id: 1,
      title: 'Основы инвестирования',
      description: 'Изучите базовые принципы и стратегии инвестирования',
      completed: true,
      icon: 'BookOpen'
    },
    {
      id: 2,
      title: 'Настройка счетов',
      description: 'Научитесь управлять реальными и тренировочными деньгами',
      completed: false,
      icon: 'Settings'
    },
    {
      id: 3,
      title: 'Собственная торговля',
      description: 'Скоро: создание персональных торговых стратегий',
      completed: false,
      icon: 'TrendingUp',
      comingSoon: true
    }
  ];

  const currentBalance = isRealMoney ? balance.real : balance.practice;

  return (
    <div className="min-h-screen bg-[#1A1A1A] text-white">
      {/* Header */}
      <header className="border-b border-gray-800 bg-[#2D2D2D]">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Icon name="TrendingUp" size={32} className="text-[#00D4AA]" />
            <h1 className="text-2xl font-bold">InvestPro</h1>
          </div>
          
          {/* Mode Switcher */}
          <div className="flex items-center space-x-4">
            <div className="text-right">
              <div className="text-sm text-gray-400">
                {isRealMoney ? 'Реальный счет' : 'Тренировочный счет'}
              </div>
              <div className="text-xl font-bold text-[#00D4AA]">
                ${currentBalance.toLocaleString()}
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <span className={`text-sm ${!isRealMoney ? 'text-[#00D4AA]' : 'text-gray-400'}`}>
                Тренировка
              </span>
              <Switch
                checked={isRealMoney}
                onCheckedChange={setIsRealMoney}
                className="data-[state=checked]:bg-[#00D4AA]"
              />
              <span className={`text-sm ${isRealMoney ? 'text-[#00D4AA]' : 'text-gray-400'}`}>
                Реальные
              </span>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Trading Area */}
          <div className="lg:col-span-2 space-y-6">
            {/* Portfolio Overview */}
            <Card className="bg-[#2D2D2D] border-gray-700">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="text-white">Портфель</span>
                  <Badge variant={isRealMoney ? "destructive" : "secondary"} className="bg-[#00D4AA] text-black">
                    {isRealMoney ? 'РЕАЛЬНЫЕ ДЕНЬГИ' : 'ТРЕНИРОВКА'}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {portfolioData.map((stock) => (
                    <div key={stock.name} className="flex items-center justify-between p-4 bg-[#1A1A1A] rounded-lg hover:bg-[#2A2A2A] transition-colors">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-[#00D4AA] rounded-full flex items-center justify-center text-black font-bold">
                          {stock.name.slice(0, 2)}
                        </div>
                        <div>
                          <div className="font-semibold text-white">{stock.name}</div>
                          <div className="text-sm text-gray-400">${stock.value.toLocaleString()}</div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="text-right">
                          <div className={`text-sm font-medium ${
                            stock.change >= 0 ? 'text-[#00D4AA]' : 'text-[#FF4757]'
                          }`}>
                            {stock.change >= 0 ? '+' : ''}{stock.change}%
                          </div>
                          <Progress value={stock.percentage} className="w-20 mt-1" />
                        </div>
                        <div className="flex space-x-2">
                          <Button 
                            size="sm" 
                            className="bg-[#FF4757] hover:bg-[#E63946] text-white h-8 px-3"
                          >
                            <Icon name="TrendingDown" size={14} className="mr-1" />
                            Продать
                          </Button>
                          <Button 
                            size="sm" 
                            className="bg-[#00D4AA] hover:bg-[#00B894] text-black h-8 px-3"
                          >
                            <Icon name="TrendingUp" size={14} className="mr-1" />
                            Купить
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Trading Chart */}
            <Card className="bg-[#2D2D2D] border-gray-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center justify-between">
                  <span>График AAPL</span>
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline" className="h-7 text-xs border-gray-600">
                      1D
                    </Button>
                    <Button size="sm" variant="outline" className="h-7 text-xs border-gray-600 bg-[#00D4AA] text-black">
                      1W
                    </Button>
                    <Button size="sm" variant="outline" className="h-7 text-xs border-gray-600">
                      1M
                    </Button>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <TradingChart />
                
                {/* Quick Trading Panel */}
                <div className="mt-6 p-4 bg-[#1A1A1A] rounded-lg">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <h4 className="text-white font-medium flex items-center">
                        <Icon name="TrendingUp" size={16} className="mr-2 text-[#00D4AA]" />
                        Купить AAPL
                      </h4>
                      <div className="space-y-2">
                        <input 
                          type="number" 
                          placeholder="Количество акций" 
                          className="w-full p-2 bg-[#2D2D2D] border border-gray-600 rounded text-white text-sm"
                        />
                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline" className="flex-1 border-gray-600 text-xs">
                            $100
                          </Button>
                          <Button size="sm" variant="outline" className="flex-1 border-gray-600 text-xs">
                            $500
                          </Button>
                          <Button size="sm" variant="outline" className="flex-1 border-gray-600 text-xs">
                            $1000
                          </Button>
                        </div>
                        <Button className="w-full bg-[#00D4AA] hover:bg-[#00B894] text-black font-medium">
                          Купить за $189.75
                        </Button>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <h4 className="text-white font-medium flex items-center">
                        <Icon name="TrendingDown" size={16} className="mr-2 text-[#FF4757]" />
                        Продать AAPL
                      </h4>
                      <div className="space-y-2">
                        <input 
                          type="number" 
                          placeholder="Количество акций" 
                          className="w-full p-2 bg-[#2D2D2D] border border-gray-600 rounded text-white text-sm"
                        />
                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline" className="flex-1 border-gray-600 text-xs">
                            25%
                          </Button>
                          <Button size="sm" variant="outline" className="flex-1 border-gray-600 text-xs">
                            50%
                          </Button>
                          <Button size="sm" variant="outline" className="flex-1 border-gray-600 text-xs">
                            100%
                          </Button>
                        </div>
                        <Button className="w-full bg-[#FF4757] hover:bg-[#E63946] text-white font-medium">
                          Продать за $189.75
                        </Button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-4 pt-4 border-t border-gray-700">
                    <div className="flex justify-between text-sm text-gray-400">
                      <span>Доступно для покупки:</span>
                      <span className="text-[#00D4AA]">${currentBalance.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm text-gray-400 mt-1">
                      <span>В портфеле AAPL:</span>
                      <span className="text-white">81 акция</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Learning Progress */}
            <Card className="bg-[#2D2D2D] border-gray-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center space-x-2">
                  <Icon name="GraduationCap" size={20} />
                  <span>Обучение</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {learningSteps.map((step) => (
                    <div key={step.id} className="flex items-start space-x-3 p-3 bg-[#1A1A1A] rounded-lg">
                      <div className={`p-2 rounded-full ${
                        step.completed ? 'bg-[#00D4AA]' : step.comingSoon ? 'bg-gray-600' : 'bg-[#FF4757]'
                      }`}>
                        <Icon 
                          name={step.icon as any} 
                          size={16} 
                          className={step.completed ? 'text-black' : 'text-white'} 
                        />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium text-white">{step.title}</h4>
                          {step.comingSoon && (
                            <Badge variant="outline" className="text-xs border-gray-600 text-gray-400">
                              Скоро
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-gray-400 mt-1">{step.description}</p>
                        {!step.comingSoon && (
                          <Button 
                            size="sm" 
                            variant={step.completed ? "secondary" : "default"}
                            className="mt-2 h-8 text-xs"
                          >
                            {step.completed ? 'Пройдено' : 'Начать'}
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card className="bg-[#2D2D2D] border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Статистика</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Дневная прибыль</span>
                    <span className="text-[#00D4AA] font-medium">+$1,234</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Общая прибыль</span>
                    <span className="text-[#00D4AA] font-medium">+15.7%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Открытых позиций</span>
                    <span className="text-white font-medium">12</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Успешных сделок</span>
                    <span className="text-[#00D4AA] font-medium">73%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Device Categories */}
            <Card className="bg-[#2D2D2D] border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Торговые платформы</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-3">
                  <Button variant="outline" className="h-16 flex-col border-gray-600 hover:border-[#00D4AA] transition-colors">
                    <Icon name="Laptop" size={20} className="mb-1" />
                    <span className="text-xs">Ноутбуки</span>
                  </Button>
                  <Button variant="outline" className="h-16 flex-col border-gray-600 hover:border-[#00D4AA] transition-colors">
                    <Icon name="Monitor" size={20} className="mb-1" />
                    <span className="text-xs">ПК</span>
                  </Button>
                  <Button variant="outline" className="h-16 flex-col border-gray-600 hover:border-[#00D4AA] transition-colors">
                    <Icon name="Smartphone" size={20} className="mb-1" />
                    <span className="text-xs">Мобильные</span>
                  </Button>
                  <Button variant="outline" className="h-16 flex-col border-gray-600 hover:border-[#00D4AA] transition-colors">
                    <Icon name="Gamepad2" size={20} className="mb-1" />
                    <span className="text-xs">Консоли</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;