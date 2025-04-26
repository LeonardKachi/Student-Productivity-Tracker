# Student Productivity Tracker

![App Screenshot](public/screenshot.png)

A web application for students to track their daily productivity, provide feedback, and identify blockers. Built with React and AWS serverless technologies.

## Features

- **User Authentication**: Secure sign-up/sign-in with Amazon Cognito
- **Productivity Logging**: Record daily learning progress
- **Feedback System**: Provide course feedback
- **Blocker Reporting**: Identify and document challenges
- **Data Visualization**: Interactive charts showing productivity trends
- **Responsive Design**: Works on desktop and mobile devices

## Architecture

The application uses a serverless architecture on AWS:

- **Frontend**: React hosted on GitHub Pages
- **Authentication**: Amazon Cognito
- **API**: API Gateway with Lambda integration
- **Database**: DynamoDB for data storage
- **Analytics**: CloudWatch for monitoring

## Setup Instructions

### Prerequisites

- Node.js (v16 or later)
- npm or yarn
- AWS account
- GitHub account

### Frontend Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/student-productivity-tracker.git
   cd student-productivity-tracker
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create `.env` files:
   - Copy `.env.example` to `.env.development` and `.env.production`
   - Fill in your AWS credentials and configuration

4. Start development server:
   ```bash
   npm start
   ```

### Backend Setup (AWS)

1. **Create Cognito User Pool**:
   - Go to AWS Cognito console
   - Create a new user pool with email sign-in
   - Note the Pool ID and App Client ID

2. **Set up DynamoDB**:
   - Create table `StudentProductivityLogs`
   - Partition key: `userId` (String)
   - Sort key: `logDate` (String)

3. **Create Lambda Function**:
   - Create new function with Node.js runtime
   - Use the provided Lambda code
   - Set appropriate IAM permissions

4. **Configure API Gateway**:
   - Create new REST API
   - Set up `/logs` endpoint with Cognito authorizer
   - Connect to Lambda function

5. **Update CORS**:
   - Enable CORS for your GitHub Pages domain
   - Add `https://your-username.github.io` to allowed origins

### Deployment

1. Build the application:
   ```bash
   npm run build
   ```

2. Deploy to GitHub Pages:
   ```bash
   npm run deploy
   ```

3. Configure GitHub Pages:
   - Go to repository Settings > Pages
   - Set source to `gh-pages` branch

## Environment Variables

| Variable | Description |
|----------|-------------|
| `REACT_APP_AWS_REGION` | AWS region for services |
| `REACT_APP_USER_POOL_ID` | Cognito User Pool ID |
| `REACT_APP_USER_POOL_CLIENT_ID` | Cognito App Client ID |
| `REACT_APP_COGNITO_DOMAIN` | Cognito hosted UI domain |
| `REACT_APP_API_ENDPOINT` | API Gateway endpoint URL |
| `REACT_APP_REDIRECT_SIGN_IN` | OAuth redirect URL for sign-in |
| `REACT_APP_REDIRECT_SIGN_OUT` | OAuth redirect URL for sign-out |

## Available Scripts

- `npm start`: Runs the app in development mode
- `npm test`: Launches the test runner
- `npm run build`: Builds the app for production
- `npm run deploy`: Builds and deploys to GitHub Pages
- `npm run eject`: Ejects from create-react-app (advanced)

## Contributing

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

Distributed under the GNU General Public License v3.0. See [License](License) for more information.

## Contact

Twitter: [Leonard_Kachi](https://twitter.com/Leonard_kachi) Email: [Henryle480@gmail.com](mailto:Henryle480@gmail.com)
LinkedIn: [Onyedikachi Obidiegwu](https://www.linkedin.com/in/onyedikachi-obidiegwu)
Portfolio: [Portfolio](https://leonardkachi.github.io/Portfolio-website/)
