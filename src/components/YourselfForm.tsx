import { useState, useEffect } from 'react';
import config from '../data/config.json';

function YourselfForm({ onNext, onPrevious }: { onNext: () => void; onPrevious: () => void }) {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [isNextEnabled, setIsNextEnabled] = useState(false);

  const formContent = config.content.yourselfForm[0];

  useEffect(() => {
    const isValidEmail = (email: string) => {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    if (fullName.trim() !== '' && isValidEmail(email) && agreedToTerms) {
      setIsNextEnabled(true);
    } else {
      setIsNextEnabled(false);
    }
  }, [fullName, email, agreedToTerms]);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-200 w-full">
      <div className="bg-white p-10 rounded-lg shadow-md max-w-2xl text-left">
        <h1 className="text-2xl font-bold mb-4">{formContent.formHeading}</h1>
        <p className="mb-8">{formContent.formDesc}</p>

        <form className="space-y-6">
          {formContent.formfields.map((field, index) => (
            <div key={index}>
              {field.type === 'input' && (
                <>
                  <label htmlFor={field.label.toLowerCase().replace(/ /g, '')} className="block text-sm font-medium text-gray-700">{field.label}</label>
                  <input 
                    type={field.label.toLowerCase() === 'email' ? 'email' : 'text'} 
                    id={field.label.toLowerCase().replace(/ /g, '')} 
                    name={field.label.toLowerCase().replace(/ /g, '')} 
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                    placeholder={field.placeholder}
                    value={field.label.toLowerCase() === 'full name' ? fullName : email}
                    onChange={(e) => {
                      const value = e.target.value;
                      if (field.label.toLowerCase() === 'full name') {
                        // Allow only letters and spaces, and limit length to 150
                        if (/^[a-zA-Z\s]*$/.test(value) && value.length <= 150) {
                          setFullName(value);
                        }
                      } else if (field.label.toLowerCase() === 'email') {
                        setEmail(value);
                      }
                    }}
                  />
                </>
              )}
              {field.type === 'checkbox' && (
                <div>
                  <h2 className="text-lg font-bold mb-2">Terms and conditions</h2>
                  <p className="text-sm text-gray-700 mb-4">
                    {formContent.formTermsCondition}
                  </p>
                  <label className="inline-flex items-center">
                    <input 
                      type="checkbox" 
                      name="agreeTerms" 
                      className="form-checkbox"
                      checked={agreedToTerms}
                      onChange={(e) => setAgreedToTerms(e.target.checked)}
                    />
                    <span className="ml-2 text-gray-700">{field.label}</span>
                  </label>
                </div>
              )}
            </div>
          ))}
        </form>

        <div className="flex justify-between mt-8">
          <button className="bg-gray-400 text-white py-3 px-6 rounded-md border-none cursor-pointer" onClick={onPrevious}>Previous</button>
          <button 
            className={`text-white py-3 px-6 rounded-md border-none cursor-pointer ${isNextEnabled ? 'bg-gray-700' : 'bg-gray-500 cursor-not-allowed'}`}
            onClick={isNextEnabled ? onNext : undefined}
            disabled={!isNextEnabled}
          >Get started</button>
        </div>
      </div>
    </div>
  );
}

export default YourselfForm;
