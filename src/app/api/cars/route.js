export async function GET() {
  try {
    // Data mobil yang sama dengan yang ada di component
    const carData = {
      brands: [
        { id: "toyota", name: "Toyota", logo: "🚗" },
        { id: "honda", name: "Honda", logo: "🚙" },
        { id: "suzuki", name: "Suzuki", logo: "🚐" },
        { id: "mitsubishi", name: "Mitsubishi", logo: "🚛" },
        { id: "daihatsu", name: "Daihatsu", logo: "🚕" },
      ],
      types: {
        toyota: [
          { id: "sedan", name: "Sedan" },
          { id: "suv", name: "SUV" },
          { id: "mpv", name: "MPV" },
          { id: "hatchback", name: "Hatchback" },
        ],
        honda: [
          { id: "sedan", name: "Sedan" },
          { id: "suv", name: "SUV" },
          { id: "mpv", name: "MPV" },
          { id: "hatchback", name: "Hatchback" },
        ],
        suzuki: [
          { id: "sedan", name: "Sedan" },
          { id: "suv", name: "SUV" },
          { id: "mpv", name: "MPV" },
        ],
        mitsubishi: [
          { id: "sedan", name: "Sedan" },
          { id: "suv", name: "SUV" },
          { id: "mpv", name: "MPV" },
          { id: "pickup", name: "Pickup" },
        ],
        daihatsu: [
          { id: "sedan", name: "Sedan" },
          { id: "suv", name: "SUV" },
          { id: "mpv", name: "MPV" },
          { id: "hatchback", name: "Hatchback" },
        ],
      },
      models: {
        toyota: {
          sedan: [
            { id: "vios", name: "Toyota Vios", price: 280000000, image: "🚗" },
            { id: "camry", name: "Toyota Camry", price: 750000000, image: "🚗" },
            { id: "corolla", name: "Toyota Corolla Altis", price: 500000000, image: "🚗" },
          ],
          suv: [
            { id: "rush", name: "Toyota Rush", price: 280000000, image: "🚙" },
            { id: "fortuner", name: "Toyota Fortuner", price: 550000000, image: "🚙" },
            { id: "raize", name: "Toyota Raize", price: 220000000, image: "🚙" },
          ],
          mpv: [
            { id: "avanza", name: "Toyota Avanza", price: 200000000, image: "🚐" },
            { id: "innova", name: "Toyota Innova", price: 350000000, image: "🚐" },
            { id: "calya", name: "Toyota Calya", price: 150000000, image: "🚐" },
          ],
          hatchback: [
            { id: "agya", name: "Toyota Agya", price: 140000000, image: "🚕" },
            { id: "yaris", name: "Toyota Yaris", price: 260000000, image: "🚕" },
          ],
        },
        honda: {
          sedan: [
            { id: "city", name: "Honda City", price: 320000000, image: "🚗" },
            { id: "civic", name: "Honda Civic", price: 550000000, image: "🚗" },
            { id: "accord", name: "Honda Accord", price: 800000000, image: "🚗" },
          ],
          suv: [
            { id: "hr-v", name: "Honda HR-V", price: 380000000, image: "🚙" },
            { id: "cr-v", name: "Honda CR-V", price: 500000000, image: "🚙" },
            { id: "br-v", name: "Honda BR-V", price: 270000000, image: "🚙" },
          ],
          mpv: [
            { id: "mobilio", name: "Honda Mobilio", price: 220000000, image: "🚐" },
            { id: "brio", name: "Honda Brio", price: 160000000, image: "🚐" },
          ],
          hatchback: [
            { id: "brio-satya", name: "Honda Brio Satya", price: 140000000, image: "🚕" },
            { id: "jazz", name: "Honda Jazz", price: 280000000, image: "🚕" },
          ],
        },
        suzuki: {
          sedan: [
            { id: "ciaz", name: "Suzuki Ciaz", price: 280000000, image: "🚗" },
          ],
          suv: [
            { id: "vitara", name: "Suzuki Vitara", price: 320000000, image: "🚙" },
            { id: "sx4-scross", name: "Suzuki SX4 S-Cross", price: 300000000, image: "🚙" },
            { id: "ignis", name: "Suzuki Ignis", price: 180000000, image: "🚙" },
          ],
          mpv: [
            { id: "ertiga", name: "Suzuki Ertiga", price: 240000000, image: "🚐" },
            { id: "apv", name: "Suzuki APV", price: 200000000, image: "🚐" },
            { id: "xl7", name: "Suzuki XL7", price: 260000000, image: "🚐" },
          ],
        },
        mitsubishi: {
          sedan: [
            { id: "mirage", name: "Mitsubishi Mirage", price: 200000000, image: "🚗" },
          ],
          suv: [
            { id: "pajero-sport", name: "Mitsubishi Pajero Sport", price: 600000000, image: "🚙" },
            { id: "outlander", name: "Mitsubishi Outlander", price: 400000000, image: "🚙" },
          ],
          mpv: [
            { id: "xpander", name: "Mitsubishi Xpander", price: 250000000, image: "🚐" },
            { id: "xpander-cross", name: "Mitsubishi Xpander Cross", price: 280000000, image: "🚐" },
          ],
          pickup: [
            { id: "l300", name: "Mitsubishi L300", price: 180000000, image: "🚚" },
            { id: "triton", name: "Mitsubishi Triton", price: 350000000, image: "🚚" },
          ],
        },
        daihatsu: {
          sedan: [
            { id: "sigra", name: "Daihatsu Sigra", price: 120000000, image: "🚗" },
          ],
          suv: [
            { id: "terios", name: "Daihatsu Terios", price: 240000000, image: "🚙" },
            { id: "rocky", name: "Daihatsu Rocky", price: 200000000, image: "🚙" },
          ],
          mpv: [
            { id: "xenia", name: "Daihatsu Xenia", price: 180000000, image: "🚐" },
            { id: "luxio", name: "Daihatsu Luxio", price: 220000000, image: "🚐" },
            { id: "grand-max", name: "Daihatsu Grand Max", price: 160000000, image: "🚐" },
          ],
          hatchback: [
            { id: "ayla", name: "Daihatsu Ayla", price: 100000000, image: "🚕" },
            { id: "sirion", name: "Daihatsu Sirion", price: 180000000, image: "🚕" },
          ],
        },
      },
    };

    return Response.json(carData, {
      status: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      },
    });
  } catch (error) {
    return Response.json(
      { error: 'Internal server error' },
      { 
        status: 500,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        },
      }
    );
  }
}
