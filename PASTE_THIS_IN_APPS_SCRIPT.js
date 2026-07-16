/**
 * Google Apps Script for CPD Sessions Webapp Integration (Passwordless 23-Column Version)
 * 
 * Instructions:
 * 1. Open your Google Sheet.
 * 2. Click Extensions > Apps Script.
 * 3. Clear any default code and paste this script in.
 * 4. Ensure you have the updated header row (Columns A to W).
 *    A: Timestamp
 *    B: First Name
 *    C: Last Name
 *    D: Email
 *    E: School Name
 *    F: S1 S1 (Teacher Submit)
 *    G: S1 S1 (Student Submit)
 *    ... and so on until W: S2 S4 (Student Submit)
 * 5. Click Deploy > Manage deployments, edit the deployment, select "New version", and click Deploy.
 */

function doGet(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var action = e.parameter.action;
    var data = sheet.getDataRange().getValues();

    // 1. Check Email Exists (Registration uniqueness check)
    if (action === "checkEmail" || e.parameter.checkEmail) {
      var checkEmail = e.parameter.checkEmail || e.parameter.email;
      var exists = false;
      for (var i = 1; i < data.length; i++) {
        if (data[i][3] && data[i][3].toString().toLowerCase() === checkEmail.trim().toLowerCase()) {
          exists = true;
          break;
        }
      }
      return makeJSONResponse({ exists: exists }, e);
    }
    
    // 2. Send Registration OTP
    if (action === "sendRegisterOTP") {
      var email = e.parameter.email;
      
      // Check if email already exists
      for (var i = 1; i < data.length; i++) {
        if (data[i][3] && data[i][3].toString().toLowerCase() === email.trim().toLowerCase()) {
          return makeJSONResponse({ success: false, error: "Email already registered" }, e);
        }
      }
      
      var otp = Math.floor(100000 + Math.random() * 900000).toString();
      var cache = CacheService.getScriptCache();
      cache.put(email.trim().toLowerCase() + "_reg_otp", otp, 300); // 5 minutes TTL
      
      try {
        MailApp.sendEmail({
          to: email.trim(),
          subject: "CPD Registration Verification Code",
          htmlBody: "<div style='font-family: sans-serif; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px; max-width: 500px;'>" +
                    "<h2 style='color: #4f46e5; margin-bottom: 20px;'>CPD Registration OTP</h2>" +
                    "<p>Thank you for signing up for CPD Classroom.</p>" +
                    "<p>Your 6-digit registration verification code is:</p>" +
                    "<div style='background: #f1f5f9; padding: 15px; border-radius: 6px; font-size: 24px; font-weight: 800; letter-spacing: 4px; text-align: center; color: #1e293b; margin: 20px 0;'>" + otp + "</div>" +
                    "<p style='font-size: 12px; color: #64748b;'>This code is valid for 5 minutes.</p>" +
                    "</div>"
        });
      } catch (err) {
        GmailApp.sendEmail(email.trim(), "CPD Registration Verification Code", "Your 6-digit registration verification code is: " + otp);
      }
      
      return makeJSONResponse({ success: true }, e);
    }
    
    // 3. Register User with OTP Verification (No password)
    if (action === "registerWithOTP") {
      var email = e.parameter.email;
      var otp = e.parameter.otp;
      var firstName = e.parameter.firstName;
      var lastName = e.parameter.lastName;
      
      var cache = CacheService.getScriptCache();
      var cachedOtp = cache.get(email.trim().toLowerCase() + "_reg_otp");
      
      if (!cachedOtp || cachedOtp !== otp) {
        return makeJSONResponse({ success: false, error: "Invalid or expired OTP. Please try again." }, e);
      }
      
      // OTP is valid! Clear it from cache
      cache.remove(email.trim().toLowerCase() + "_reg_otp");
      
      // Double check if already registered in the meantime
      for (var i = 1; i < data.length; i++) {
        if (data[i][3] && data[i][3].toString().toLowerCase() === email.trim().toLowerCase()) {
          return makeJSONResponse({ success: false, error: "Email already registered" }, e);
        }
      }
      
      var newRow = [
        new Date(),
        firstName.trim(),
        lastName.trim(),
        email.trim().toLowerCase(),
        "", // School Name (Col E)
        "", "", // S1 S1 (Col F, G)
        "", "", // S1 S2 (Col H, I)
        "", "", // S1 S3 (Col J, K)
        "", "", // S1 S4 (Col L, M)
        "", "", // S1 S5 (Col N, O)
        "", "", // S2 S1 (Col P, Q)
        "", "", // S2 S2 (Col R, S)
        "", "", // S2 S3 (Col T, U)
        "", ""  // S2 S4 (Col V, W)
      ];
      sheet.appendRow(newRow);
      
      return makeJSONResponse({
        success: true,
        user: {
          firstName: firstName.trim(),
          lastName: lastName.trim(),
          email: email.trim().toLowerCase(),
          schoolName: ""
        }
      }, e);
    }
    
    // 4. Send Login OTP
    if (action === "sendLoginOTP") {
      var email = e.parameter.email;
      var found = false;
      var userName = "";
      
      for (var i = 1; i < data.length; i++) {
        var row = data[i];
        if (row[3] && row[3].toString().toLowerCase() === email.trim().toLowerCase()) {
          found = true;
          userName = row[1]; // First Name
          break;
        }
      }
      
      if (!found) {
        return makeJSONResponse({ success: false, error: "Email address not registered. Please register first." }, e);
      }
      
      var otp = Math.floor(100000 + Math.random() * 900000).toString();
      var cache = CacheService.getScriptCache();
      cache.put(email.trim().toLowerCase() + "_login_otp", otp, 300); // 5 minutes TTL
      
      try {
        MailApp.sendEmail({
          to: email.trim(),
          subject: "CPD Classroom Verification Code",
          htmlBody: "<div style='font-family: sans-serif; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px; max-width: 500px;'>" +
                    "<h2 style='color: #4f46e5; margin-bottom: 20px;'>CPD Learning Portal Login</h2>" +
                    "<p>Hello " + userName + ",</p>" +
                    "<p>You are attempting to sign in to your CPD Classroom account.</p>" +
                    "<p>Your 6-digit verification code is:</p>" +
                    "<div style='background: #f1f5f9; padding: 15px; border-radius: 6px; font-size: 24px; font-weight: 800; letter-spacing: 4px; text-align: center; color: #1e293b; margin: 20px 0;'>" + otp + "</div>" +
                    "<p style='font-size: 12px; color: #64748b;'>This code is valid for 5 minutes.</p>" +
                    "</div>"
        });
      } catch (err) {
        GmailApp.sendEmail(email.trim(), "CPD Classroom Verification Code", "Your 6-digit verification code is: " + otp);
      }
      
      return makeJSONResponse({ success: true }, e);
    }
    
    // 5. Verify Login OTP
    if (action === "verifyLoginOTP") {
      var email = e.parameter.email;
      var otp = e.parameter.otp;
      
      var cache = CacheService.getScriptCache();
      var cachedOtp = cache.get(email.trim().toLowerCase() + "_login_otp");
      
      if (!cachedOtp || cachedOtp !== otp) {
        return makeJSONResponse({ success: false, error: "Invalid or expired OTP. Please try again." }, e);
      }
      
      // OTP is valid! Clear from cache and return user profile
      cache.remove(email.trim().toLowerCase() + "_login_otp");
      
      for (var i = 1; i < data.length; i++) {
        var row = data[i];
        if (row[3] && row[3].toString().toLowerCase() === email.trim().toLowerCase()) {
          return makeJSONResponse({
            success: true,
            user: {
              firstName: row[1],
              lastName: row[2],
              email: row[3],
              schoolName: row[4] || "" // Column E (index 4)
            }
          }, e);
        }
      }
      return makeJSONResponse({ success: false, error: "User not found" }, e);
    }
    
    // 6. Save School Name
    if (action === "saveSchool") {
      var email = e.parameter.email;
      var schoolName = e.parameter.schoolName;
      
      var userRowIdx = -1;
      for (var i = 1; i < data.length; i++) {
        if (data[i][3] && data[i][3].toString().toLowerCase() === email.trim().toLowerCase()) {
          userRowIdx = i + 1;
          break;
        }
      }
      
      if (userRowIdx !== -1) {
        sheet.getRange(userRowIdx, 5).setValue(schoolName); // Column E is now 5
        return makeJSONResponse({ success: true }, e);
      }
      return makeJSONResponse({ success: false, error: "User not found" }, e);
    }
    
    // 7. Submit Link
    if (action === "submitLink") {
      var email = e.parameter.email;
      var moduleId = parseInt(e.parameter.moduleId, 10);
      var linkType = e.parameter.linkType;
      var url = e.parameter.url;
      
      var userRowIdx = -1;
      for (var i = 1; i < data.length; i++) {
        if (data[i][3] && data[i][3].toString().toLowerCase() === email.trim().toLowerCase()) {
          userRowIdx = i + 1;
          break;
        }
      }
      
      if (userRowIdx === -1) {
        return makeJSONResponse({ success: false, error: "User not found" }, e);
      }
      
      var baseCol;
      if (moduleId === 1) baseCol = 6;       // S1 S1 (Col F)
      else if (moduleId === 3) baseCol = 8;   // S1 S2 (Col H)
      else if (moduleId === 5) baseCol = 10;  // S1 S3 (Col J)
      else if (moduleId === 7) baseCol = 12;  // S1 S4 (Col L)
      else if (moduleId === 9) baseCol = 14;  // S1 S5 (Col N)
      else if (moduleId === 2) baseCol = 16;  // S2 S1 (Col P)
      else if (moduleId === 4) baseCol = 18;  // S2 S2 (Col R)
      else if (moduleId === 6) baseCol = 20;  // S2 S3 (Col T)
      else if (moduleId === 8) baseCol = 22;  // S2 S4 (Col V)
      else baseCol = 6;
      
      var targetCol = (linkType === "teacher") ? baseCol : baseCol + 1;
      sheet.getRange(userRowIdx, targetCol).setValue(url);
      return makeJSONResponse({ success: true }, e);
    }
    
    // 8. Check Link Unique
    if (action === "checkLink" || e.parameter.checkLink) {
      var checkLink = e.parameter.checkLink || e.parameter.url;
      var email = e.parameter.email;
      for (var i = 1; i < data.length; i++) {
        var row = data[i];
        var rowEmail = row[3];
        if (rowEmail && rowEmail.toLowerCase() !== email.toLowerCase()) {
          for (var colIdx = 5; colIdx < 23; colIdx++) { // Index 5 (Col F) to index 22 (Col W)
            var cellVal = row[colIdx];
            if (cellVal && cellVal.toString().trim().toLowerCase() === checkLink.trim().toLowerCase()) {
              return makeJSONResponse({ exists: true }, e);
            }
          }
        }
      }
      return makeJSONResponse({ exists: false }, e);
    }
    
    return makeJSONResponse({ error: "Invalid action parameters" }, e);
  } catch(err) {
    return makeJSONResponse({ success: false, error: err.toString() }, e);
  }
}

function doPost(e) {
  return doGet(e);
}

function makeJSONResponse(object, e) {
  var prefix = e && e.parameter && e.parameter.prefix;
  var jsonString = JSON.stringify(object);
  if (prefix) {
    return ContentService.createTextOutput(prefix + '(' + jsonString + ')')
      .setMimeType(ContentService.MimeType.JAVASCRIPT);
  }
  return ContentService.createTextOutput(jsonString)
    .setMimeType(ContentService.MimeType.JSON);
}

function doOptions(e) {
  var output = ContentService.createTextOutput("");
  var responseHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type"
  };
  for (var key in responseHeaders) {
    output.setHeader(key, responseHeaders[key]);
  }
  return output;
}
