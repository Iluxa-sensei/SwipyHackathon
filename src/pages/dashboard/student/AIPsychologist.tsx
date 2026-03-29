import { useEffect, useState } from "react";
import { pageTitle } from "@/lib/page-title";
import { Heart, Brain, Smile, Frown, Calendar, TrendingUp, MessageSquare, BookOpen, Activity, Target, Send, X, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

const StudentAIPsychologist = () => {
  useEffect(() => {
    document.title = pageTitle("AI‑психолог — Ученик");
  }, []);

  const [currentMood, setCurrentMood] = useState("happy");
  const [moodHistory, setMoodHistory] = useState([
    { date: "Пн", mood: "happy", value: 8 },
    { date: "Вт", mood: "neutral", value: 6 },
    { date: "Ср", mood: "sad", value: 4 },
    { date: "Чт", mood: "happy", value: 9 },
    { date: "Пт", mood: "happy", value: 7 },
    { date: "Сб", mood: "neutral", value: 5 },
    { date: "Вс", mood: "happy", value: 8 }
  ]);

  // Состояния для различных функций
  const [chatOpen, setChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    {
      id: 1,
      text: "Привет! Я ваш AI-психолог. Я здесь, чтобы выслушать вас и поддержать в трудные моменты. Вы можете рассказать мне о любых переживаниях - о проблемах в школе, с друзьями, семьей, или просто поделиться тем, что у вас на душе. Я буду рядом и помогу найти способы справиться с трудностями. Как дела? Что вас беспокоит?",
      sender: "ai",
      timestamp: new Date()
    }
  ]);
  const [newMessage, setNewMessage] = useState("");
  const [diaryOpen, setDiaryOpen] = useState(false);
  const [diaryEntry, setDiaryEntry] = useState("");
  const [relaxationOpen, setRelaxationOpen] = useState(false);
  const [currentRelaxation, setCurrentRelaxation] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  const [conversationContext, setConversationContext] = useState<string[]>([]);

  const activities = [
    { name: "Медитация", duration: "10 мин", completed: true, icon: "🧘" },
    { name: "Дыхательные упражнения", duration: "5 мин", completed: true, icon: "🫁" },
    { name: "Прогулка", duration: "30 мин", completed: false, icon: "🚶" },
    { name: "Чтение", duration: "20 мин", completed: false, icon: "📖" }
  ];

  const getMoodIcon = (mood: string) => {
    switch (mood) {
      case "happy": return "😊";
      case "neutral": return "😐";
      case "sad": return "😔";
      default: return "😊";
    }
  };

  const getMoodColor = (mood: string) => {
    switch (mood) {
      case "happy": return "text-emerald-600";
      case "neutral": return "text-yellow-600";
      case "sad": return "text-red-600";
      default: return "text-gray-600";
    }
  };

  // Функции для обработки действий
  const handleMoodChange = (mood: string) => {
    setCurrentMood(mood);
    // Обновляем историю настроения
    const today = new Date().toLocaleDateString('ru-RU', { weekday: 'short' });
    const updatedHistory = moodHistory.map(day =>
      day.date === today ? { ...day, mood, value: mood === "happy" ? 8 : mood === "neutral" ? 6 : 4 } : day
    );
    setMoodHistory(updatedHistory);
  };

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    const userMessage = {
      id: Date.now(),
      text: newMessage,
      sender: "user",
      timestamp: new Date()
    };

    setChatMessages(prev => [...prev, userMessage]);

    // Сохраняем контекст разговора
    setConversationContext(prev => [...prev.slice(-4), newMessage.toLowerCase()]);

    setNewMessage("");

    // Симуляция ответа AI
    setTimeout(() => {
      const aiResponse = {
        id: Date.now() + 1,
        text: generateAIResponse(newMessage),
        sender: "ai",
        timestamp: new Date()
      };
      setChatMessages(prev => [...prev, aiResponse]);
    }, 1000);
  };

  const generateAIResponse = (userMessage: string) => {
    const message = userMessage.toLowerCase();
    const context = conversationContext.join(' ');

    // Проверяем контекст для продолжения разговора
    if (context.includes('буллят') || context.includes('буллинг')) {
      const followUpResponses = [
        "Я помню, что вы говорили о буллинге. Как дела сейчас? Удалось ли поговорить с кем-то из взрослых?",
        "Мы обсуждали ситуацию с буллингом. Есть ли какие-то изменения? Как вы себя чувствуете?",
        "Помню нашу беседу о буллинге. Расскажите, что происходит сейчас? Стало ли лучше?",
        "Мы говорили о том, что вас обижают. Как развивается ситуация? Нужна ли еще помощь?"
      ];
      return followUpResponses[Math.floor(Math.random() * followUpResponses.length)];
    }

    // Специфические ответы на буллинг
    if (message.includes('буллят') || message.includes('буллинг') || message.includes('травля') || message.includes('издеваются')) {
      const bullyingResponses = [
        "Я понимаю, как тяжело переживать буллинг. Это не ваша вина, и вы не заслуживаете такого обращения. Расскажите, кто именно и как вас обижает?",
        "Буллинг - это серьезная проблема, и я горжусь тем, что вы решили об этом поговорить. Кто-то из взрослых знает о ситуации?",
        "То, что с вами происходит, недопустимо. Вы имеете право чувствовать себя в безопасности. Есть ли учитель или взрослый, которому вы доверяете?",
        "Буллинг может сильно влиять на самооценку, но помните - проблема не в вас, а в тех, кто так поступает. Как долго это продолжается?",
        "Я здесь, чтобы поддержать вас. Буллинг - это не нормально. Давайте обсудим, как можно защитить себя и получить помощь."
      ];
      return bullyingResponses[Math.floor(Math.random() * bullyingResponses.length)];
    }

    // Ответы на тревогу и стресс
    if (message.includes('тревожно') || message.includes('страшно') || message.includes('волнуюсь') || message.includes('нервничаю')) {
      const anxietyResponses = [
        "Тревога - это естественная реакция. Давайте попробуем технику дыхания: вдох на 4 счета, задержка на 4, выдох на 6. Что именно вызывает у вас тревогу?",
        "Понимаю, что тревожно. Попробуйте назвать 5 вещей, которые вы видите вокруг себя прямо сейчас. Это поможет заземлиться. Расскажите, о чем вы переживаете?",
        "Тревога может быть очень изнурительной. Есть ли что-то конкретное, что помогает вам успокоиться? Может быть, музыка или прогулка?",
        "Ваши чувства обоснованы. Тревога - это способ нашего тела защитить нас. Давайте найдем способы справиться с ней вместе."
      ];
      return anxietyResponses[Math.floor(Math.random() * anxietyResponses.length)];
    }

    // Ответы на грусть и депрессию
    if (message.includes('грустно') || message.includes('печально') || message.includes('плохо') || message.includes('депрессия')) {
      const sadnessResponses = [
        "Грусть - это нормальная эмоция, и важно ее проживать. Расскажите, что именно вас расстраивает? Иногда проговаривание помогает.",
        "Я понимаю, что сейчас тяжело. Даже в самые темные моменты есть надежда. Что обычно помогает вам почувствовать себя лучше?",
        "Грусть может быть очень глубокой. Помните, что это временно, даже если так не кажется. Есть ли что-то, что приносит вам радость?",
        "Ваши чувства важны. Иногда нам нужно время, чтобы пережить грусть. Как долго вы чувствуете себя так?"
      ];
      return sadnessResponses[Math.floor(Math.random() * sadnessResponses.length)];
    }

    // Ответы на проблемы с друзьями
    if (message.includes('друзья') || message.includes('друг') || message.includes('ссора') || message.includes('конфликт')) {
      const friendshipResponses = [
        "Конфликты с друзьями могут быть очень болезненными. Расскажите, что произошло? Иногда недопонимание можно решить разговором.",
        "Дружба - это важно, но иногда отношения могут быть сложными. Что именно вас беспокоит в ваших отношениях с друзьями?",
        "Потеря друга или ссора может быть очень болезненной. Помните, что настоящая дружба основана на взаимном уважении. Что случилось?",
        "Конфликты в дружбе - это нормально, но важно их решать. Готовы ли вы поговорить с другом о том, что вас беспокоит?"
      ];
      return friendshipResponses[Math.floor(Math.random() * friendshipResponses.length)];
    }

    // Ответы на проблемы с семьей
    if (message.includes('родители') || message.includes('мама') || message.includes('папа') || message.includes('семья')) {
      const familyResponses = [
        "Семейные отношения могут быть сложными. Расскажите, что происходит дома? Иногда родители не понимают, что мы чувствуем.",
        "Понимаю, что семейные проблемы могут быть очень болезненными. Что именно вас беспокоит в отношениях с семьей?",
        "Семья - это важно, но иногда там могут быть конфликты. Помните, что ваши чувства важны. Что происходит?",
        "Родители иногда не понимают нас, но это не значит, что они нас не любят. Расскажите, в чем проблема?"
      ];
      return familyResponses[Math.floor(Math.random() * familyResponses.length)];
    }

    // Ответы на проблемы в школе
    if (message.includes('школа') || message.includes('учитель') || message.includes('урок') || message.includes('оценки')) {
      const schoolResponses = [
        "Школа может быть стрессовым местом. Что именно вас беспокоит? Учеба, отношения с учителями или одноклассниками?",
        "Понимаю, что школа может быть сложной. Расскажите подробнее, что происходит? Иногда проблемы в школе влияют на наше настроение.",
        "Школьные проблемы могут казаться непреодолимыми, но мы можем найти решения. Что именно вас беспокоит?",
        "Учеба и школа - это важная часть жизни, но не единственная. Что происходит, что вас расстраивает?"
      ];
      return schoolResponses[Math.floor(Math.random() * schoolResponses.length)];
    }

    // Позитивные ответы
    if (message.includes('хорошо') || message.includes('отлично') || message.includes('радостно') || message.includes('счастлив')) {
      const positiveResponses = [
        "Это замечательно! Рад слышать, что у вас все хорошо. Расскажите, что приносит вам радость?",
        "Отлично! Позитивные эмоции - это то, что нужно ценить. Что именно делает вас счастливым?",
        "Здорово! Хорошее настроение - это прекрасно. Поделитесь, что хорошего произошло в вашей жизни?",
        "Это прекрасно! Рад, что вы чувствуете себя хорошо. Что помогает вам поддерживать такое настроение?"
      ];
      return positiveResponses[Math.floor(Math.random() * positiveResponses.length)];
    }

    // Общие поддерживающие ответы
    const generalResponses = [
      "Я здесь, чтобы выслушать и поддержать вас. Расскажите подробнее, что вас беспокоит?",
      "Ваши чувства важны, и я готов помочь. Что именно происходит в вашей жизни?",
      "Понимаю, что вам может быть трудно. Давайте разберемся вместе. Расскажите, что вас тревожит?",
      "Я готов выслушать вас без осуждения. Поделитесь тем, что у вас на душе?",
      "Каждый имеет право на поддержку. Расскажите, как я могу помочь вам сегодня?",
      "Ваши переживания важны. Давайте обсудим, что происходит, и найдем способы справиться с ситуацией.",
      "Я здесь, чтобы помочь вам разобраться в своих чувствах. Что именно вас беспокоит?",
      "Понимаю, что иногда бывает трудно. Расскажите подробнее, и мы вместе найдем решение."
    ];

    return generalResponses[Math.floor(Math.random() * generalResponses.length)];
  };

  const handleSaveDiary = () => {
    if (!diaryEntry.trim()) return;

    // Сохраняем запись в дневник
    const diaryData = {
      id: Date.now(),
      text: diaryEntry,
      date: new Date(),
      mood: currentMood
    };

    // Здесь можно добавить логику сохранения в localStorage или API
    console.log("Diary entry saved:", diaryData);
    setDiaryEntry("");
    setDiaryOpen(false);

    // Показываем уведомление
    alert("Запись сохранена в дневник настроения!");
  };

  const handleStartRelaxation = (type: string) => {
    setCurrentRelaxation(type);
    setRelaxationOpen(true);
  };

  const handleGetRecommendations = () => {
    const newRecommendations = [
      "Попробуйте технику 4-7-8 дыхания: вдох на 4 счета, задержка на 7, выдох на 8",
      "Слушайте спокойную музыку 10-15 минут в день",
      "Ведите дневник благодарности - записывайте 3 хорошие вещи каждый день",
      "Делайте короткие прогулки на свежем воздухе",
      "Практикуйте медитацию осознанности по 5-10 минут"
    ];

    setRecommendations(newRecommendations);
    alert("Персональные рекомендации обновлены!");
  };

  const handleActivityToggle = (index: number) => {
    const updatedActivities = activities.map((activity, i) =>
      i === index ? { ...activity, completed: !activity.completed } : activity
    );
    // Здесь можно обновить состояние activities
  };

  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl md:text-3xl font-display font-bold">AI‑психолог</h1>
          <p className="text-muted-foreground mt-1">Поддержка благополучия и эмоционального здоровья</p>
        </div>
        <Dialog open={chatOpen} onOpenChange={setChatOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" className="flex items-center gap-2">
              <MessageSquare className="w-4 h-4" />
              Чат с психологом
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[80vh]">
            <DialogHeader>
              <DialogTitle>Чат с AI-психологом</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="h-96 overflow-y-auto border rounded-lg p-4 space-y-3">
                {chatMessages.map((message) => (
                  <div key={message.id} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[80%] p-3 rounded-lg ${message.sender === 'user'
                      ? 'bg-brand text-white'
                      : 'bg-gray-100 text-gray-900'
                      }`}>
                      <p className="text-sm">{message.text}</p>
                      <p className="text-xs opacity-70 mt-1">
                        {message.timestamp.toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex gap-2">
                <Textarea
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Напишите ваше сообщение..."
                  className="flex-1"
                  onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), handleSendMessage())}
                />
                <Button onClick={handleSendMessage} disabled={!newMessage.trim()}>
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Current Mood */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="p-6 rounded-xl border bg-purple-50 border border-purple-100">
          <h3 className="font-semibold mb-4 flex items-center gap-2">
            <Heart className="w-4 h-4 text-brand" />
            Как вы себя чувствуете сегодня?
          </h3>
          <div className="grid grid-cols-3 gap-3">
            {["happy", "neutral", "sad"].map((mood) => (
              <Button
                key={mood}
                variant={currentMood === mood ? "default" : "outline"}
                onClick={() => handleMoodChange(mood)}
                className={`flex flex-col items-center gap-2 p-4 h-auto transition-all ${currentMood === mood ? "bg-brand hover:bg-brand scale-105" : "hover:scale-105"
                  }`}
              >
                <span className="text-2xl">{getMoodIcon(mood)}</span>
                <span className="text-xs">
                  {mood === "happy" ? "Хорошо" : mood === "neutral" ? "Нормально" : "Плохо"}
                </span>
              </Button>
            ))}
          </div>
        </div>

        <div className="p-6 rounded-xl border bg-purple-50/90 border border-purple-100">
          <h3 className="font-semibold mb-4 flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-emerald-600" />
            Настроение за неделю
          </h3>
          <div className="space-y-3">
            {moodHistory.map((day, index) => (
              <div key={index} className="flex items-center gap-3">
                <span className="text-sm font-medium w-8">{day.date}</span>
                <div className="flex-1">
                  <Progress value={day.value * 10} className="h-2" />
                </div>
                <span className={`text-lg ${getMoodColor(day.mood)}`}>
                  {getMoodIcon(day.mood)}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Daily Activities */}
      <div className="p-6 rounded-xl border bg-card">
        <h3 className="font-semibold mb-4 flex items-center gap-2">
          <Activity className="w-4 h-4 text-brand" />
          Рекомендуемые активности
        </h3>
        <div className="grid md:grid-cols-2 gap-4">
          {activities.map((activity, index) => (
            <div key={index} className="flex items-center gap-3 p-4 rounded-lg border bg-white/50">
              <div className="text-2xl">{activity.icon}</div>
              <div className="flex-1">
                <h4 className="font-medium">{activity.name}</h4>
                <p className="text-sm text-muted-foreground">{activity.duration}</p>
              </div>
              <Button
                size="sm"
                variant={activity.completed ? "outline" : "default"}
                className={activity.completed ? "text-emerald-600 border-emerald-200" : ""}
                onClick={() => handleActivityToggle(index)}
              >
                {activity.completed ? "✓ Выполнено" : "Начать"}
              </Button>
            </div>
          ))}
        </div>
      </div>

      {/* Wellness Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl border bg-card">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-emerald-50 text-emerald-600">
              <Smile className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Среднее настроение</p>
              <p className="text-xl font-bold">7.2/10</p>
            </div>
          </div>
        </div>
        <div className="p-4 rounded-xl border bg-card">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-purple-100 text-brand">
              <Brain className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Дней подряд</p>
              <p className="text-xl font-bold">12</p>
            </div>
          </div>
        </div>
        <div className="p-4 rounded-xl border bg-card">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-purple-100 text-brand">
              <Target className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Цели выполнено</p>
              <p className="text-xl font-bold">8/10</p>
            </div>
          </div>
        </div>
        <div className="p-4 rounded-xl border bg-card">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-orange-100 text-orange-600">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Сессий с ИИ</p>
              <p className="text-xl font-bold">5</p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid md:grid-cols-3 gap-4">
        <div className="p-6 rounded-xl border border-purple-100 bg-purple-50">
          <h3 className="font-semibold mb-4 flex items-center gap-2">
            <MessageSquare className="w-4 h-4 text-pink-600" />
            Дневник настроения
          </h3>
          <p className="text-sm text-muted-foreground mb-4">
            Записывайте свои мысли и эмоции
          </p>
          <Dialog open={diaryOpen} onOpenChange={setDiaryOpen}>
            <DialogTrigger asChild>
              <Button size="sm" className="bg-pink-600 hover:bg-pink-700">
                Написать запись
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Дневник настроения</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Ваше текущее настроение:</label>
                  <div className="flex gap-2 mt-2">
                    {["happy", "neutral", "sad"].map((mood) => (
                      <Button
                        key={mood}
                        variant={currentMood === mood ? "default" : "outline"}
                        size="sm"
                        onClick={() => setCurrentMood(mood)}
                        className="flex items-center gap-1"
                      >
                        <span>{getMoodIcon(mood)}</span>
                        <span className="text-xs">
                          {mood === "happy" ? "Хорошо" : mood === "neutral" ? "Нормально" : "Плохо"}
                        </span>
                      </Button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium">Опишите ваши мысли и чувства:</label>
                  <Textarea
                    value={diaryEntry}
                    onChange={(e) => setDiaryEntry(e.target.value)}
                    placeholder="Как прошел ваш день? Что вас беспокоит или радует?"
                    className="mt-2"
                    rows={4}
                  />
                </div>
                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setDiaryOpen(false)}>
                    Отмена
                  </Button>
                  <Button onClick={handleSaveDiary} disabled={!diaryEntry.trim()}>
                    Сохранить запись
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <div className="p-6 rounded-xl border bg-purple-50 border border-purple-100">
          <h3 className="font-semibold mb-4 flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-brand" />
            Техники релаксации
          </h3>
          <p className="text-sm text-muted-foreground mb-4">
            Упражнения для снятия стресса
          </p>
          <Dialog open={relaxationOpen} onOpenChange={setRelaxationOpen}>
            <DialogTrigger asChild>
              <Button size="sm" className="bg-brand hover:bg-brand-dark rounded-xl">
                Начать упражнение
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Техники релаксации</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="grid gap-3">
                  <Button
                    variant="outline"
                    className="justify-start h-auto p-4"
                    onClick={() => handleStartRelaxation('breathing')}
                  >
                    <div className="text-left">
                      <div className="font-medium">Дыхательное упражнение 4-7-8</div>
                      <div className="text-sm text-muted-foreground">Вдох на 4, задержка на 7, выдох на 8</div>
                    </div>
                  </Button>
                  <Button
                    variant="outline"
                    className="justify-start h-auto p-4"
                    onClick={() => handleStartRelaxation('meditation')}
                  >
                    <div className="text-left">
                      <div className="font-medium">Медитация осознанности</div>
                      <div className="text-sm text-muted-foreground">5-10 минут фокуса на дыхании</div>
                    </div>
                  </Button>
                  <Button
                    variant="outline"
                    className="justify-start h-auto p-4"
                    onClick={() => handleStartRelaxation('progressive')}
                  >
                    <div className="text-left">
                      <div className="font-medium">Прогрессивная релаксация</div>
                      <div className="text-sm text-muted-foreground">Постепенное расслабление мышц</div>
                    </div>
                  </Button>
                </div>
                {currentRelaxation && (
                  <div className="p-4 bg-purple-50 rounded-lg">
                    <h4 className="font-medium mb-2">Инструкции:</h4>
                    <p className="text-sm text-muted-foreground">
                      {currentRelaxation === 'breathing' && "Сядьте удобно, закройте глаза. Вдохните на 4 счета, задержите дыхание на 7 счетов, выдохните на 8 счетов. Повторите 4-5 раз."}
                      {currentRelaxation === 'meditation' && "Сядьте в удобной позе, закройте глаза. Сосредоточьтесь на своем дыхании. Когда мысли отвлекают, мягко верните внимание к дыханию."}
                      {currentRelaxation === 'progressive' && "Начните с пальцев ног, напрягите их на 5 секунд, затем расслабьте. Постепенно переходите к икрам, бедрам, животу, рукам, плечам, лицу."}
                    </p>
                  </div>
                )}
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <div className="p-6 rounded-xl border bg-purple-50 border border-purple-100">
          <h3 className="font-semibold mb-4 flex items-center gap-2">
            <Heart className="w-4 h-4 text-brand" />
            Рекомендации
          </h3>
          <p className="text-sm text-muted-foreground mb-4">
            Персональные советы от ИИ
          </p>
          <Button size="sm" className="bg-brand hover:bg-brand-dark rounded-xl" onClick={handleGetRecommendations}>
            Получить совет
          </Button>
        </div>
      </div>

      {/* Recent Insights */}
      <div className="p-6 rounded-xl border bg-card">
        <h3 className="font-semibold mb-4 flex items-center gap-2">
          <Brain className="w-4 h-4 text-brand" />
          Последние инсайты
        </h3>
        <div className="space-y-3">
          <div className="p-3 rounded-lg bg-purple-50 border border-purple-200">
            <p className="text-sm">
              <span className="font-semibold">Заметка:</span> Вы лучше всего себя чувствуете после физической активности.
              Попробуйте добавить 15 минут упражнений в день.
            </p>
          </div>
          <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-200">
            <p className="text-sm">
              <span className="font-semibold">Прогресс:</span> Ваше настроение улучшилось на 20% за последнюю неделю.
              Продолжайте практиковать техники релаксации.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StudentAIPsychologist;
