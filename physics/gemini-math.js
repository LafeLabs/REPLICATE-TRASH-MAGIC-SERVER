// Include math.js in your HTML:
// <script src="https://cdn.jsdelivr.net/npm/mathjs@11.8.0/lib/browser/math.js"></script>

function fitHistogramToGaussian(data, numBins) {
  // 1. Create Histogram
  const histogram = createHistogram(data, numBins);

  // 2. Estimate Initial Gaussian Parameters
  const { mean: initialMean, stdDev: initialStdDev } = estimateGaussianParameters(
    histogram.binCenters,
    histogram.bins
  );

  // 3. Define the Gaussian Model Function
  const gaussianModel = (x, mean, stdDev) => {
    const exponent = math.pow(x - mean, 2) / (2 * math.pow(stdDev, 2));
    return (1 / (stdDev * math.sqrt(2 * math.PI))) * math.exp(-exponent);
  };

  // 4. Define the Error Function (Sum of Squared Errors)
  const errorFunction = (params) => {
    const mean = params[0];
    const stdDev = params[1];
    let sumSquaredErrors = 0;

    for (let i = 0; i < histogram.binCenters.length; i++) {
      const predicted = gaussianModel(histogram.binCenters[i], mean, stdDev);
      const actual = histogram.bins[i] / math.max(...histogram.bins); // Normalize histogram
      sumSquaredErrors += math.pow(predicted - actual, 2);
    }
    return sumSquaredErrors;
  };

  // 5. Use Math.js Optimization (Levenberg-Marquardt)
  const initialParams = [initialMean, initialStdDev];
  const optimizedParams = math.optimize.levenbergMarquardt(
    errorFunction,
    initialParams
  ).x;

  const optimizedMean = optimizedParams[0];
  const optimizedStdDev = optimizedParams[1];

  // 6. Generate the Optimized Gaussian Curve
  const optimizedGaussianCurve = histogram.binCenters.map((x) =>
    gaussianModel(x, optimizedMean, optimizedStdDev)
  );

  return {
    histogram,
    initialMean,
    initialStdDev,
    optimizedMean,
    optimizedStdDev,
    optimizedGaussianCurve,
  };
}

// Helper Functions
function createHistogram(data, numBins) {
  const min = math.min(...data);
  const max = math.max(...data);
  const binWidth = (max - min) / numBins;
  const bins = new Array(numBins).fill(0);
  const binCenters = new Array(numBins);

  for (const value of data) {
    const binIndex = Math.floor((value - min) / binWidth);
    if (binIndex >= 0 && binIndex < numBins) {
      bins[binIndex]++;
    }
  }

  for (let i = 0; i < numBins; i++) {
    binCenters[i] = min + binWidth * (i + 0.5);
  }

  return { bins, binCenters };
}

function estimateGaussianParameters(binCenters, bins) {
  let sum = 0;
  let sumSq = 0;
  let totalCount = 0;

  for (let i = 0; i < bins.length; i++) {
    sum += binCenters[i] * bins[i];
    sumSq += binCenters[i] * binCenters[i] * bins[i];
    totalCount += bins[i];
  }

  const mean = sum / totalCount;
  const variance = sumSq / totalCount - math.pow(mean, 2);
  const stdDev = math.sqrt(variance);

  return { mean, stdDev };
}

// Example Usage
const data = Array.from({ length: 1000 }, () => math.random() * 100);
const numBins = 20;
const fitResult = fitHistogramToGaussian(data, numBins);

console.log('Initial Mean:', fitResult.initialMean);
console.log('Initial StdDev:', fitResult.initialStdDev);
console.log('Optimized Mean:', fitResult.optimizedMean);
console.log('Optimized StdDev:', fitResult.optimizedStdDev);

// Now you can use Chart.js or Plotly.js to visualize the results
// ... (Visualization code using fitResult) ...
