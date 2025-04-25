
interface ViewerStatusProps {
  interactionStatus: string;
  isGestureMode: boolean;
  isRTL?: boolean;
}

const ViewerStatus = ({ 
  interactionStatus, 
  isGestureMode, 
  isRTL = false 
}: ViewerStatusProps) => {
  return (
    <>
      {interactionStatus && (
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-black/80 text-white px-4 py-2 rounded-full text-sm">
          {interactionStatus}
        </div>
      )}
      
      {isGestureMode && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-blue-900/80 text-white px-4 py-2 rounded-lg text-sm max-w-xs text-center">
          {isRTL 
            ? 'حرك يدك في الهواء لتدوير وتكبير النموذج'
            : 'Move your hand in the air to rotate and scale the model'}
        </div>
      )}
      
      <div className="p-4 bg-blue-900/30 text-sm text-blue-300">
        {isGestureMode 
          ? (isRTL 
            ? 'وضع الإشارة: حرك يدك أفقياً للدوران، وعمودياً للتكبير/التصغير'
            : 'Gesture mode: Move horizontally to rotate, vertically to zoom')
          : (isRTL 
            ? 'اضغط واسحب لتدوير النموذج. استخدم أزرار التكبير والتصغير للتحكم.'
            : 'Click and drag to rotate the model. Use zoom buttons to control scale.')}
      </div>
    </>
  );
};

export default ViewerStatus;
