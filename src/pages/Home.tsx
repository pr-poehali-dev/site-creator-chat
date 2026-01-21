import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-purple-50 to-pink-50">
      <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/20">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-heading font-bold gradient-text">
            ChatSpace
          </h1>
          <div className="flex items-center gap-4">
            <Link to="/">
              <Button variant="ghost" className="hover-scale">
                Главная
              </Button>
            </Link>
            <Link to="/chat">
              <Button variant="ghost" className="hover-scale">
                Чат
              </Button>
            </Link>
            <Link to="/about">
              <Button variant="ghost" className="hover-scale">
                О создателе
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      <section className="pt-32 pb-20 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center space-y-8 animate-fade-in-up">
            <div className="inline-block">
              <div className="w-24 h-24 mx-auto mb-8 bg-gradient-to-br from-primary to-secondary rounded-3xl flex items-center justify-center animate-float shadow-2xl">
                <Icon name="MessageCircle" size={48} className="text-white" />
              </div>
            </div>
            
            <h2 className="text-6xl md:text-7xl font-heading font-extrabold gradient-text leading-tight">
              Общайся с создателем
            </h2>
            
            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto font-light">
              Открытая платформа для прямого диалога. Задавай вопросы, делись идеями, получай мгновенные ответы в реальном времени.
            </p>

            <div className="flex items-center justify-center gap-4 pt-8">
              <Link to="/chat">
                <Button size="lg" className="text-lg px-8 py-6 hover-lift shadow-xl">
                  <Icon name="Send" size={20} className="mr-2" />
                  Начать общение
                </Button>
              </Link>
              <Link to="/about">
                <Button size="lg" variant="outline" className="text-lg px-8 py-6 hover-scale">
                  <Icon name="User" size={20} className="mr-2" />
                  Узнать больше
                </Button>
              </Link>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mt-24">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg hover-lift animate-scale-in">
              <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                <Icon name="Zap" size={32} className="text-primary" />
              </div>
              <h3 className="text-2xl font-heading font-bold mb-3">Мгновенно</h3>
              <p className="text-muted-foreground">
                Получай ответы в реальном времени без задержек. Уведомления о новых сообщениях приходят моментально.
              </p>
            </div>

            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg hover-lift animate-scale-in" style={{ animationDelay: '0.1s' }}>
              <div className="w-16 h-16 bg-secondary/10 rounded-xl flex items-center justify-center mb-4">
                <Icon name="Shield" size={32} className="text-secondary" />
              </div>
              <h3 className="text-2xl font-heading font-bold mb-3">Безопасно</h3>
              <p className="text-muted-foreground">
                Твои данные защищены. Общайся в приватной и безопасной среде без посторонних.
              </p>
            </div>

            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg hover-lift animate-scale-in" style={{ animationDelay: '0.2s' }}>
              <div className="w-16 h-16 bg-accent/10 rounded-xl flex items-center justify-center mb-4">
                <Icon name="Heart" size={32} className="text-accent" />
              </div>
              <h3 className="text-2xl font-heading font-bold mb-3">Открыто</h3>
              <p className="text-muted-foreground">
                Прямой доступ к создателю. Задавай любые вопросы и получай честные ответы.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-6 bg-gradient-to-r from-primary/5 to-secondary/5">
        <div className="container mx-auto max-w-4xl text-center">
          <h3 className="text-4xl font-heading font-bold mb-6 gradient-text">
            Готов начать диалог?
          </h3>
          <p className="text-xl text-muted-foreground mb-8">
            Присоединяйся к открытому общению прямо сейчас
          </p>
          <Link to="/chat">
            <Button size="lg" className="text-lg px-12 py-6 hover-lift shadow-xl">
              <Icon name="MessageSquare" size={20} className="mr-2" />
              Перейти в чат
            </Button>
          </Link>
        </div>
      </section>

      <footer className="py-12 px-6 border-t">
        <div className="container mx-auto text-center text-muted-foreground">
          <p>© 2024 ChatSpace. Платформа для открытого общения.</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
