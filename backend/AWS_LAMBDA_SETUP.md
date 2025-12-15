# AWS Lambda Deployment Setup Guide

Complete step-by-step guide for deploying SOOTHE CMS Backend to AWS Lambda.

---

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [AWS Account Setup](#aws-account-setup)
3. [RDS PostgreSQL Database Setup](#rds-postgresql-database-setup)
4. [S3 Bucket Configuration](#s3-bucket-configuration)
5. [VPC and Security Groups](#vpc-and-security-groups)
6. [IAM Roles and Policies](#iam-roles-and-policies)
7. [Environment Variables](#environment-variables)
8. [Local Testing](#local-testing)
9. [Deployment to AWS Lambda](#deployment-to-aws-lambda)
10. [Frontend & Admin Panel Deployment](#frontend--admin-panel-deployment)
11. [Post-Deployment Verification](#post-deployment-verification)
12. [Troubleshooting](#troubleshooting)

---

## Prerequisites

Before you begin, ensure you have:

- ✅ AWS Account with billing enabled
- ✅ AWS CLI installed and configured (`aws configure`)
- ✅ Node.js 18+ installed
- ✅ Serverless Framework installed globally: `npm install -g serverless`
- ✅ Git repository with your code
- ✅ Domain names (optional, for custom domains)

---

## AWS Account Setup

### 1. Create AWS Account

If you don't have an AWS account:

1. Go to [aws.amazon.com](https://aws.amazon.com)
2. Click "Create an AWS Account"
3. Follow the registration process
4. Enable billing (required for most services)

### 2. Configure AWS CLI

```bash
# Install AWS CLI (if not installed)
# Windows: Download from https://aws.amazon.com/cli/
# Mac: brew install awscli
# Linux: sudo apt-get install awscli

# Configure AWS credentials
aws configure

# You'll be prompted for:
# - AWS Access Key ID
# - AWS Secret Access Key
# - Default region (e.g., us-east-1)
# - Default output format (json)
```

**To get AWS Access Keys:**
1. Go to AWS Console → IAM → Users
2. Click your username → Security credentials
3. Click "Create access key"
4. Choose "Command Line Interface (CLI)"
5. Download and save the keys securely

---

## RDS PostgreSQL Database Setup

### Step 1: Create RDS Instance

**Option A: Using AWS Console**

1. Go to AWS Console → RDS → Databases
2. Click "Create database"
3. Choose:
   - **Engine**: PostgreSQL
   - **Version**: 15.x (or latest)
   - **Template**: Free tier (for development) or Production
   - **DB Instance Identifier**: `soothe-cms-db`
   - **Master Username**: `soothe_user`
   - **Master Password**: Create a strong password (save it!)
   - **DB Instance Class**: `db.t3.micro` (free tier) or `db.t3.small` (production)
   - **Storage**: 20 GB (minimum)
   - **VPC**: Default VPC (or your custom VPC)
   - **Public Access**: **No** (for security)
   - **VPC Security Group**: Create new (we'll configure it later)
   - **Database Name**: `soothe_cms`
4. Click "Create database"
5. Wait 5-10 minutes for database to be created

**Option B: Using AWS CLI**

```bash
aws rds create-db-instance \
  --db-instance-identifier soothe-cms-db \
  --db-instance-class db.t3.micro \
  --engine postgres \
  --engine-version 15.4 \
  --master-username soothe_user \
  --master-user-password YOUR_SECURE_PASSWORD \
  --allocated-storage 20 \
  --storage-type gp2 \
  --vpc-security-group-ids sg-xxxxx \
  --db-subnet-group-name default \
  --backup-retention-period 7 \
  --no-publicly-accessible \
  --db-name soothe_cms
```

### Step 2: Get Database Endpoint

1. Go to RDS → Databases → `soothe-cms-db`
2. Copy the **Endpoint** (e.g., `soothe-cms-db.xxxxx.us-east-1.rds.amazonaws.com`)
3. Note the **Port** (usually `5432`)

**Save this information - you'll need it for DATABASE_URL**

### Step 3: Run Database Migrations

Once the database is ready, run migrations:

```bash
cd backend

# Set DATABASE_URL temporarily
export DATABASE_URL="postgresql://soothe_user:YOUR_PASSWORD@ENDPOINT:5432/soothe_cms?schema=public"

# Generate Prisma Client
npm run prisma:generate

# Run migrations
npx prisma migrate deploy

# Seed database (first time only)
npm run prisma:seed
```

---

## S3 Bucket Configuration

### Step 1: Create S3 Bucket

**Option A: Using AWS Console**

1. Go to AWS Console → S3 → Buckets
2. Click "Create bucket"
3. Configure:
   - **Bucket name**: `soothe-cms-uploads-{your-unique-id}` (must be globally unique)
   - **AWS Region**: Same as your Lambda (e.g., `us-east-1`)
   - **Block Public Access**: **Uncheck** "Block all public access" (files need to be accessible)
   - **Bucket Versioning**: Disable (unless needed)
   - **Default encryption**: Enable (SSE-S3)
4. Click "Create bucket"

**Option B: Using AWS CLI**

```bash
aws s3 mb s3://soothe-cms-uploads-{your-unique-id} --region us-east-1
```

### Step 2: Configure Bucket CORS

Create a file `cors.json`:

```json
{
  "CORSRules": [
    {
      "AllowedOrigins": ["*"],
      "AllowedMethods": ["GET", "PUT", "POST", "DELETE", "HEAD"],
      "AllowedHeaders": ["*"],
      "ExposeHeaders": ["ETag"],
      "MaxAgeSeconds": 3000
    }
  ]
}
```

Apply CORS:

```bash
aws s3api put-bucket-cors \
  --bucket soothe-cms-uploads-{your-unique-id} \
  --cors-configuration file://cors.json
```

Or via Console:
1. Go to S3 → Your bucket → Permissions → CORS
2. Paste the CORS configuration above
3. Save

### Step 3: Configure Bucket Policy (Public Read)

Go to S3 → Your bucket → Permissions → Bucket policy:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicReadGetObject",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::soothe-cms-uploads-{your-unique-id}/*"
    }
  ]
}
```

**Save the bucket name - you'll need it for S3_BUCKET environment variable**

---

## VPC and Security Groups

### Step 1: Create Security Group for RDS

1. Go to AWS Console → EC2 → Security Groups
2. Click "Create security group"
3. Configure:
   - **Name**: `soothe-rds-sg`
   - **Description**: Security group for RDS database
   - **VPC**: Select your VPC (default or custom)
4. Add **Inbound Rule**:
   - **Type**: PostgreSQL
   - **Port**: 5432
   - **Source**: Select the security group you'll create for Lambda (or use VPC CIDR)
5. Click "Create security group"
6. **Save the Security Group ID** (e.g., `sg-xxxxxxxxx`)

### Step 2: Create Security Group for Lambda

1. Go to EC2 → Security Groups
2. Click "Create security group"
3. Configure:
   - **Name**: `soothe-lambda-sg`
   - **Description**: Security group for Lambda function
   - **VPC**: Same as RDS
4. Add **Outbound Rule**:
   - **Type**: All traffic
   - **Destination**: 0.0.0.0/0
5. Click "Create security group"
6. **Save the Security Group ID**

### Step 3: Update RDS Security Group

1. Go to RDS → Databases → `soothe-cms-db` → Connectivity & security
2. Click on the security group
3. Edit inbound rules
4. Add rule:
   - **Type**: PostgreSQL
   - **Port**: 5432
   - **Source**: Select `soothe-lambda-sg` security group
5. Save rules

### Step 4: Get VPC and Subnet Information

1. Go to EC2 → VPCs
2. Note your **VPC ID** (e.g., `vpc-xxxxxxxxx`)
3. Go to EC2 → Subnets
4. Note **two subnet IDs** in different availability zones (e.g., `subnet-xxxxx`, `subnet-yyyyy`)

**Save these for serverless.yml configuration**

---

## IAM Roles and Policies

### Step 1: Create IAM Role for Lambda

The Serverless Framework will create this automatically, but you can also create it manually:

1. Go to IAM → Roles → Create role
2. Select "AWS service" → "Lambda"
3. Attach policies:
   - `AWSLambdaBasicExecutionRole` (for CloudWatch logs)
   - `AWSLambdaVPCAccessExecutionRole` (for VPC access)
4. Create custom policy for S3 access:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "s3:PutObject",
        "s3:GetObject",
        "s3:DeleteObject",
        "s3:PutObjectAcl"
      ],
      "Resource": "arn:aws:s3:::soothe-cms-uploads-{your-bucket-name}/*"
    }
  ]
}
```

5. Name the role: `soothe-lambda-execution-role`
6. **Save the role ARN** (e.g., `arn:aws:iam::ACCOUNT_ID:role/soothe-lambda-execution-role`)

---

## Environment Variables

Create a `.env` file in the `backend` directory with the following variables:

```env
# Database
DATABASE_URL="postgresql://soothe_user:YOUR_PASSWORD@soothe-cms-db.xxxxx.us-east-1.rds.amazonaws.com:5432/soothe_cms?schema=public"

# JWT Secrets (generate secure random strings)
JWT_SECRET="your-32-character-secret-key-here"
JWT_REFRESH_SECRET="your-32-character-refresh-secret-here"

# AWS Configuration
S3_BUCKET="soothe-cms-uploads-{your-unique-id}"
AWS_REGION="us-east-1"

# CORS (comma-separated list of allowed origins)
CORS_ORIGIN="https://yourdomain.com,https://admin.yourdomain.com,https://www.yourdomain.com"

# Application
NODE_ENV="production"
MAX_FILE_SIZE="5242880"
THROTTLE_TTL="60"
THROTTLE_LIMIT="10"

# Email Configuration (optional)
SMTP_HOST="smtp.gmail.com"
SMTP_PORT="587"
SMTP_USER="noreply@yourdomain.com"
SMTP_PASSWORD="your-app-password"
ADMIN_EMAIL="admin@yourdomain.com"

# VPC Configuration (for serverless.yml)
SECURITY_GROUP_ID="sg-xxxxxxxxx"
SUBNET_ID_1="subnet-xxxxx"
SUBNET_ID_2="subnet-yyyyy"
```

### Generate Secure JWT Secrets

```bash
# Generate JWT secrets
openssl rand -base64 32
# Run twice to get two different secrets
```

---

## Local Testing

### Step 1: Install Dependencies

```bash
cd backend
npm install
```

### Step 2: Build the Application

```bash
npm run build
```

### Step 3: Test with Serverless Offline

```bash
# Start serverless offline
npx serverless offline

# The API will be available at:
# http://localhost:3000/api/v1
```

### Step 4: Test API Endpoints

```bash
# Test health endpoint
curl http://localhost:3000/api/v1/settings

# Test with authentication
curl -X POST http://localhost:3000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@soothe.com","password":"Admin@123"}'
```

---

## Deployment to AWS Lambda

### Step 1: Update serverless.yml

Edit `backend/serverless.yml` and uncomment/update the VPC configuration:

```yaml
vpc:
  securityGroupIds:
    - ${env:SECURITY_GROUP_ID}
  subnetIds:
    - ${env:SUBNET_ID_1}
    - ${env:SUBNET_ID_2}
```

### Step 2: Deploy to AWS

```bash
cd backend

# Deploy to dev stage
serverless deploy

# Or deploy to production
serverless deploy --stage prod
```

### Step 3: Get API Gateway URL

After deployment, you'll see output like:

```
endpoints:
  ANY - https://xxxxx.execute-api.us-east-1.amazonaws.com/dev/{proxy+}
  ANY - https://xxxxx.execute-api.us-east-1.amazonaws.com/dev/
```

**Save this URL - you'll need it for frontend/admin configuration**

### Step 4: Update CORS_ORIGIN

After deploying frontend/admin, update the Lambda environment variable:

```bash
serverless deploy function -f api --update-env CORS_ORIGIN="https://yourdomain.com,https://admin.yourdomain.com"
```

Or redeploy with updated `.env` file.

---

## Frontend & Admin Panel Deployment

### Quick Overview

Your frontend and admin panel are Next.js applications that need to connect to your Lambda backend.

**Recommended**: Deploy to Vercel (easiest) or Netlify

**Alternative**: Deploy to AWS S3 + CloudFront (if staying in AWS)

### Required Environment Variable

Both frontend and admin panel need:

```env
NEXT_PUBLIC_API_URL=https://xxxxx.execute-api.us-east-1.amazonaws.com/dev/api/v1
```

### Detailed Instructions

See separate deployment guides:
- **Frontend**: See `FRONTEND_DEPLOYMENT.md` in root directory
- **Admin Panel**: See `admin-panel/ADMIN_DEPLOYMENT.md`

---

## Post-Deployment Verification

### 1. Test API Endpoint

```bash
# Test settings endpoint
curl https://xxxxx.execute-api.us-east-1.amazonaws.com/dev/api/v1/settings
```

### 2. Test Authentication

```bash
# Login
curl -X POST https://xxxxx.execute-api.us-east-1.amazonaws.com/dev/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@soothe.com","password":"Admin@123"}'

# Save the access token from response
# Then test authenticated endpoint
curl https://xxxxx.execute-api.us-east-1.amazonaws.com/dev/api/v1/auth/me \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"
```

### 3. Test File Upload

```bash
# Upload a file (requires authentication token)
curl -X POST https://xxxxx.execute-api.us-east-1.amazonaws.com/dev/api/v1/media/upload \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -F "file=@test-image.jpg" \
  -F "altText=Test image"
```

### 4. Check CloudWatch Logs

```bash
# View Lambda logs
serverless logs -f api --tail

# Or via AWS Console
# CloudWatch → Log groups → /aws/lambda/soothe-cms-backend-dev-api
```

### 5. Monitor Lambda Function

- Go to AWS Console → Lambda → Functions → `soothe-cms-backend-dev-api`
- Check:
  - Invocations
  - Errors
  - Duration
  - Throttles

---

## Troubleshooting

### Database Connection Issues

**Problem**: Lambda can't connect to RDS

**Solutions**:
1. Verify RDS security group allows Lambda security group
2. Check VPC configuration in serverless.yml
3. Ensure RDS is in the same VPC as Lambda
4. Verify DATABASE_URL is correct
5. Check RDS is not publicly accessible (should be private)

### S3 Upload Fails

**Problem**: File uploads fail with permission error

**Solutions**:
1. Verify IAM role has S3 permissions
2. Check S3 bucket name in environment variables
3. Verify bucket policy allows public read
4. Check CORS configuration on bucket

### Cold Start Issues

**Problem**: First request is slow (1-3 seconds)

**Solutions**:
1. Enable provisioned concurrency in serverless.yml:
   ```yaml
   provisionedConcurrency: 1
   ```
2. Reduce bundle size (already optimized for Prisma)
3. Use Lambda@Edge for better performance (advanced)

### CORS Errors

**Problem**: Frontend can't make requests to API

**Solutions**:
1. Update CORS_ORIGIN environment variable with frontend domain
2. Redeploy Lambda function
3. Check API Gateway CORS settings
4. Verify frontend is using correct API URL

### Package Size Too Large

**Problem**: Deployment fails due to package size

**Solutions**:
1. Check serverless.yml package patterns
2. Ensure Prisma engines are optimized (already configured)
3. Remove unnecessary dependencies
4. Use Lambda layers for large dependencies (advanced)

### Environment Variables Not Working

**Problem**: Environment variables not accessible in Lambda

**Solutions**:
1. Verify variables are in serverless.yml environment section
2. Redeploy after changing .env file
3. Check CloudWatch logs for actual values (don't log secrets!)
4. Use AWS Systems Manager Parameter Store for secrets (recommended)

---

## Cost Optimization

### Estimated Monthly Costs

- **Lambda**: ~$0.20 per 1M requests (free tier: 1M/month)
- **API Gateway**: ~$3.50 per 1M requests (free tier: 1M/month)
- **RDS db.t3.micro**: ~$15/month
- **S3 Storage**: ~$0.023/GB/month
- **Data Transfer**: First 100GB free, then $0.09/GB

**Total**: ~$20-50/month for moderate traffic

### Cost Saving Tips

1. Use RDS db.t3.micro for development
2. Enable S3 lifecycle policies to archive old files
3. Use CloudFront caching for API responses (advanced)
4. Monitor and optimize Lambda memory allocation
5. Set up billing alerts in AWS

---

## Security Best Practices

1. ✅ **Never commit `.env` files** to Git
2. ✅ **Use AWS Secrets Manager** for sensitive data
3. ✅ **Enable RDS encryption** at rest
4. ✅ **Use VPC** for database isolation
5. ✅ **Enable S3 bucket versioning** (optional)
6. ✅ **Set up CloudWatch alarms** for errors
7. ✅ **Regularly rotate JWT secrets**
8. ✅ **Use HTTPS only** (API Gateway provides this)
9. ✅ **Limit CORS origins** to your domains only
10. ✅ **Enable AWS WAF** for DDoS protection (advanced)

---

## Next Steps

1. ✅ Deploy backend to Lambda
2. ✅ Deploy frontend (see `FRONTEND_DEPLOYMENT.md`)
3. ✅ Deploy admin panel (see `admin-panel/ADMIN_DEPLOYMENT.md`)
4. ✅ Configure custom domains (optional)
5. ✅ Set up monitoring and alerts
6. ✅ Configure backups for RDS
7. ✅ Set up CI/CD pipeline (optional)

---

## Support

For issues or questions:
- Check CloudWatch logs
- Review Serverless Framework documentation
- Check AWS service health dashboard
- Review this guide's troubleshooting section

---

**Last Updated**: December 2025
**Status**: Production Ready

