#!/usr/bin/env python3
"""Test login endpoint directly"""
import sys
import os
sys.path.insert(0, '/Users/deep01/Documents/PT/Backend')
os.chdir('/Users/deep01/Documents/PT/Backend')

from dotenv import load_dotenv
load_dotenv()

# Print credentials
admin_user = os.getenv("ADMIN_USERNAME", "admin")
admin_pass = os.getenv("ADMIN_PASSWORD", "admin123")

print(f"✓ Admin Username: {admin_user}")
print(f"✓ Admin Password: {admin_pass}")

# Test login logic
test_username = "Deep"
test_password = "Deep@1392"

if test_username == admin_user and test_password == admin_pass:
    print(f"\n✅ Login would SUCCESS for {test_username}:{test_password}")
else:
    print(f"\n❌ Login would FAIL for {test_username}:{test_password}")
    print(f"   Expected: {admin_user}:{admin_pass}")
