import { motion } from 'framer-motion';

type FormProgressProps = {
  steps: number;
  currentStep: number;
};

const FormProgress = ({ steps, currentStep }: FormProgressProps) => {
  return (
    <div className="w-full mb-8">
      <div className="flex justify-between">
        {Array.from({ length: steps }).map((_, index) => (
          <div key={index} className="flex flex-col items-center">
            <motion.div
              className={`w-8 h-8 rounded-full flex items-center justify-center ${
                index < currentStep
                  ? 'bg-purple-600 text-white'
                  : index === currentStep
                  ? 'bg-indigo-500 text-white'
                  : 'bg-gray-300 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
              }`}
              initial={{ scale: 0.8 }}
              animate={{ scale: index === currentStep ? 1.1 : 1 }}
              transition={{ duration: 0.3 }}
            >
              {index < currentStep ? (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                </svg>
              ) : (
                index + 1
              )}
            </motion.div>
            {index < steps - 1 && (
              <div className={`w-full h-1 mt-4 ${
                index < currentStep ? 'bg-purple-600' : 'bg-gray-300 dark:bg-gray-700'
              }`}></div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FormProgress;
