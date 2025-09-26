
import React, {useState, useEffect} from 'react'
import axiosInstance from '../axiosinstance'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faSpinner} from '@fortawesome/free-solid-svg-icons'  



const Dashboard = () => {
  const [ticker, setTicker] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [plot, setPlot] = useState();
  const [ma100, setMA100] = useState();
  const [ma200, setMA200] = useState();
  const [percentChange, setPercentChange] = useState();
  const [prediction, setPrediction] = useState();
  const [mse, setMSE] = useState();
  const [rmse, setRMSE] = useState();
  const [r2, setR2] = useState();

  useEffect(() => {
    const fetchProtectedData = async () => {

     try {
        const response = await axiosInstance.get('/protected-view')
        console.log("Protected data: ", response.data);
     } catch (error) {
        console.error("Error fetching protected data: ", error);
     }  
    }

    fetchProtectedData();    
  }, []);

  const handleTickerSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axiosInstance.post('/predict/', { ticker: ticker });
      // Concatenate the response data to the BACKEND_ROOT to form the full URL
      const backendRoot = import.meta.env.VITE_BACKEND_ROOT;
      const plotUrl = `${backendRoot}${response.data.plot_img}`
      const ma100Url = `${backendRoot}${response.data.plot_100_dma}`
      const ma200Url = `${backendRoot}${response.data.plot_200_dma}`
      const percentChangeUrl = `${backendRoot}${response.data.plot_percent_change}`  
      const predictionUrl = `${backendRoot}${response.data.plot_prediction}`    
     
      // Set the full URLs in state
      setPlot(plotUrl);
      setMA100(ma100Url);
      setMA200(ma200Url);
      setPercentChange(percentChangeUrl);
      setPrediction(predictionUrl);

       // Set the metrics in state
      setMSE(response.data.mse);
      setRMSE(response.data.rmse);
      setR2(response.data.r2);
      setError('');
            
      console.log("Prediction response: ", response.data);
      
      if(response.data.error) {
        setError(response.data.error);         
      }
    } catch (error) {
      //console.error("Error fetching prediction data: ", error);
      setPlot();
      setMA100();
      setMA200();
      setPercentChange();
      setPrediction();
      // If the error response contains a message, use it; otherwise, use a generic message
      setError(error.response.data.error || 'An error occurred while fetching prediction data.');      
    } finally {
      setLoading(false);
    } 
    
  } 

  return (
    <div className='container'>
      <div className="row">
        <div className="col-md-6 mx-auto">
          <form onSubmit={(e) => {handleTickerSubmit(e)}}>         
            <input type="text" className="form-control" placeholder='Enter Stock Ticker' onChange={(e) => setTicker(e.target.value)} required />
            <small>{error && <div className='text-danger'>{error}</div>}</small>
            <button type="submit" className="btn btn-info mt-4">
              {loading ? <span><FontAwesomeIcon icon={faSpinner} spin />Please wait...</span>  : 'See Prediction'}  &nbsp;
            </button>
          </form>
        </div>
        { /* Print Prediction Plot */}
        { error ? <div></div> : (plot && 
          <div className="mt-4">
            <img src={plot} alt="Prediction Plot" className='img-fluid' style={{ maxWidth: '100%' }} />
          </div>)}        

        { /* Print 100 DMA Plot */}
        { error ? <div></div> : (ma100 && 
          <div className="mt-4">
            <img src={ma100} alt="100 DMA Plot" className='img-fluid' style={{ maxWidth: '100%' }} />
          </div>)}  
        
        { /* Print 200 DMA Plot */}
        { error ? <div></div> : (ma200 && 
          <div className="mb-4">
            <img src={ma200} alt="200 DMA Plot" className='img-fluid' style={{ maxWidth: '100%' }} />
          </div>)}  

        { /* Print Percent Change Plot */}
        { error ? <div></div> : (percentChange && 
          <div className="mb-4">
            <img src={percentChange} alt="Percent Change Plot" className='img-fluid' style={{ maxWidth: '100%' }} />
          </div>)}

        { /* Print Prediction Text */}
        { error ? <div></div> : (prediction && 
          <div className="mb-4">
            <img src={prediction} alt="Prediction Plot" className='img-fluid' style={{ maxWidth: '100%' }} />
          </div>)}  

        { /* Print Metrics */}
        { error ? <div></div> : (mse && rmse && r2 && 
          <div className="text-light p-3">
            <h5>Model Evaluation:</h5>
              <p>Mean Squared Error (MSE): {mse.toFixed(6)}</p>
              <p>Root Mean Squared Error (RMSE): {rmse.toFixed(6)}</p>
              <p>R-Squared (R²): {r2.toFixed(6)}</p>
          </div>)}  



       
         

        
      </div>      
    </div>
  )
}

export default Dashboard