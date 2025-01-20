# NEXT Configuration

In this new project we updated the '/next.config.ts':

```bash
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    config.module.rules.push({ test: /\.node$/, use: 'raw-loader' })
    if(!isServer) config.externals.push('canvas');
    return config;
};

export default nextConfig;
```
Explain what this file is responsible for. Next explain the updates made to the file.