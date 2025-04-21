
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, User, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface VirtualAssistantProps {
  isRTL: boolean;
  onClose: () => void;
}

const VirtualAssistant = ({ isRTL, onClose }: VirtualAssistantProps) => {
  const [messages, setMessages] = useState<{ content: string; isUser: boolean }[]>([
    { 
      content: isRTL 
        ? 'مرحبًا! أنا المساعد الافتراضي للمزادات. كيف يمكنني مساعدتك اليوم؟'
        : 'Hello! I\'m the auction virtual assistant. How can I help you today?', 
      isUser: false 
    }
  ]);
  
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Scroll to bottom of messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  // Sample responses for common questions
  const getAssistantResponse = (question: string) => {
    const lowercaseQ = question.toLowerCase();
    
    if (lowercaseQ.includes('bid') || lowercaseQ.includes('المزايدة')) {
      return isRTL 
        ? 'لوضع مزايدة، انقر على زر "المزايدة الآن" على القطعة التي تهتم بها. ستحتاج إلى تحديد مبلغ المزايدة الخاص بك والتأكيد. يجب أن تكون المزايدة أعلى من المزايدة الحالية بنسبة 5٪ على الأقل.'
        : 'To place a bid, click the "Place Bid" button on the item you\'re interested in. You\'ll need to specify your bid amount and confirm. The bid must be at least 5% higher than the current bid.';
    } else if (lowercaseQ.includes('auction') || lowercaseQ.includes('مزاد')) {
      return isRTL 
        ? 'مزاداتنا تستمر عادة لمدة 7 أيام. نقوم بإطلاق مزادات جديدة كل يوم جمعة. يمكنك متابعة مزاداتك المفضلة وتلقي إشعارات عندما تتم مزايدة جديدة.'
        : 'Our auctions typically run for 7 days. We launch new auctions every Friday. You can follow your favorite auctions and receive notifications when new bids are placed.';
    } else if (lowercaseQ.includes('sell') || lowercaseQ.includes('بيع')) {
      return isRTL 
        ? 'لبيع قطعة أثرية، استخدم نموذج "بيع قطعتك الأثرية" وقدم صورًا عالية الجودة ومعلومات تفصيلية. سيقوم خبراؤنا بمراجعة طلبك خلال 48 ساعة.'
        : 'To sell an artifact, use the "Sell Your Artifact" form and provide high-quality images and detailed information. Our experts will review your submission within 48 hours.';
    } else if (lowercaseQ.includes('authenticity') || lowercaseQ.includes('أصالة')) {
      return isRTL 
        ? 'نحن نتحقق من أصالة جميع القطع المعروضة في مزاداتنا. يتم تقديم شهادة الأصالة مع كل قطعة. إذا كنت بائعًا، فستحتاج إلى تقديم دليل على الأصالة أو الموافقة على فحص القطعة من قبل خبرائنا.'
        : 'We verify the authenticity of all items featured in our auctions. A certificate of authenticity is provided with each item. If you\'re a seller, you\'ll need to provide proof of authenticity or agree to have the item examined by our experts.';
    } else {
      return isRTL 
        ? 'شكرًا على سؤالك. هل يمكنني مساعدتك في أي شيء آخر يتعلق بالمزادات، مثل كيفية المزايدة أو بيع قطعة أثرية أو فهم عملية التحقق من الأصالة؟'
        : 'Thank you for your question. Can I help you with anything else related to auctions, such as how to bid, sell an artifact, or understand the authentication process?';
    }
  };
  
  const handleSendMessage = () => {
    if (inputValue.trim() === '') return;
    
    // Add user message
    setMessages(prev => [...prev, { content: inputValue, isUser: true }]);
    
    // Simulate assistant response after a short delay
    setTimeout(() => {
      const response = getAssistantResponse(inputValue);
      setMessages(prev => [...prev, { content: response, isUser: false }]);
    }, 1000);
    
    setInputValue('');
  };
  
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };
  
  return (
    <motion.div 
      className="fixed bottom-4 right-4 w-80 md:w-96 h-[450px] bg-background rounded-lg shadow-xl border border-border z-50 flex flex-col overflow-hidden"
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 50, opacity: 0 }}
    >
      <div className="p-4 bg-museum-brown/90 text-white flex justify-between items-center">
        <h3 className="font-semibold">
          {isRTL ? 'المساعد الافتراضي للمزادات' : 'Auction Virtual Assistant'}
        </h3>
        <button 
          onClick={onClose}
          className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-white/20 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
      
      <div className="flex-1 p-4 overflow-y-auto bg-muted/30">
        <AnimatePresence>
          {messages.map((message, index) => (
            <motion.div 
              key={index}
              className={`mb-4 flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div 
                className={`max-w-[80%] rounded-lg p-3 ${
                  message.isUser 
                    ? 'bg-museum-brown/20 text-foreground'
                    : 'bg-museum-brown/90 text-white'
                }`}
              >
                {message.content}
              </div>
            </motion.div>
          ))}
          <div ref={messagesEndRef} />
        </AnimatePresence>
      </div>
      
      <div className="p-3 border-t border-border flex gap-2">
        <Input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={isRTL ? 'اكتب رسالتك هنا...' : 'Type your message here...'}
          className="flex-1"
        />
        <Button 
          onClick={handleSendMessage}
          size="icon"
          className="bg-museum-brown hover:bg-museum-brown/90"
        >
          <Send className="w-4 h-4" />
        </Button>
      </div>
    </motion.div>
  );
};

export default VirtualAssistant;
