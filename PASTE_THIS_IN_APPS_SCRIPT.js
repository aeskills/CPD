/**
 * Google Apps Script for CPD Sessions Webapp Integration
 * (Customized 23-Column Version with Passwordless OTP authentication)
 * 
 * Instructions:
 * 1. Open your Google Sheet.
 * 2. Click Extensions > Apps Script.
 * 3. Clear any default code and paste this script in.
 * 4. Ensure you have the updated header row (Columns A to W):
 *    A: Timestamp
 *    B: First Name
 *    C: Last Name
 *    D: Email
 *    E: School Name
 *    F: Series 1 Session 1 Teacher Link
 *    G: Series 1 Session 1 Gallery Link
 *    H: Series 1 Session 2 Teacher Link
 *    I: Series 1 Session 4 Teacher Link
 *    J: Series 1 Session 4 Gallery Link
 *    K: Series 1 Session 5 Teacher Link
 *    L: Series 1 Session 5 Gallery Link
 *    M: Series 1 Session 2 Gallery Link
 *    N: Series 1 Session 3 Teacher Link
 *    O: Series 1 Session 3 Gallery Link
 *    P: Series 2 Session 1 Teacher Link
 *    Q: Series 2 Session 1 Gallery Link
 *    R: Series 2 Session 2 Teacher Link
 *    S: Series 2 Session 2 Gallery Link
 *    T: Series 2 Session 3 Teacher Link
 *    U: Series 2 Session 3 Gallery Link
 *    V: Series 2 Session 4 Teacher Link
 *    W: Series 2 Session 4 Gallery Link
 * 
 * 5. Click Save.
 * 6. Click Deploy > New deployment. Select "Web app".
 * 7. Set "Execute as" to "Me" and "Who has access" to "Anyone". Click Deploy.
 * 8. Copy the Web App Executable URL and update it in config.js if changed.
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
                    "<h2 style='color: #eb1000; margin-bottom: 20px;'>CPD Registration OTP</h2>" +
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
        "", "", // S1 S1 Teacher, Gallery (Col F, G)
        "", // S1 S2 Teacher (Col H)
        "", "", // S1 S4 Teacher, Gallery (Col I, J)
        "", "", // S1 S5 Teacher, Gallery (Col K, L)
        "", // S1 S2 Gallery (Col M)
        "", "", // S1 S3 Teacher, Gallery (Col N, O)
        "", "", // S2 S1 Teacher, Gallery (Col P, Q)
        "", "", // S2 S2 Teacher, Gallery (Col R, S)
        "", "", // S2 S3 Teacher, Gallery (Col T, U)
        "", ""  // S2 S4 Teacher, Gallery (Col V, W)
      ];
      sheet.appendRow(newRow);
      
      return makeJSONResponse({
        success: true,
        user: {
          firstName: firstName.trim(),
          lastName: lastName.trim(),
          email: email.trim().toLowerCase(),
          schoolName: "",
          moduleLinks: {}
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
                    "<h2 style='color: #eb1000; margin-bottom: 20px;'>CPD Learning Portal Login</h2>" +
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
          var links = getModuleLinksFromRow(row);
          return makeJSONResponse({
            success: true,
            user: {
              firstName: row[1],
              lastName: row[2],
              email: row[3],
              schoolName: row[4] || "", // Column E
              moduleLinks: links
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
        sheet.getRange(userRowIdx, 5).setValue(schoolName); // Column E (5)
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
      
      var targetCol;
      if (moduleId === 1) {
        targetCol = (linkType === "teacher") ? 6 : 7;   // Col F (6), G (7)
      } else if (moduleId === 3) {
        targetCol = (linkType === "teacher") ? 8 : 13;  // Col H (8), M (13)
      } else if (moduleId === 5) {
        targetCol = (linkType === "teacher") ? 14 : 15; // Col N (14), O (15)
      } else if (moduleId === 7) {
        targetCol = (linkType === "teacher") ? 9 : 10;  // Col I (9), J (10)
      } else if (moduleId === 9) {
        targetCol = (linkType === "teacher") ? 11 : 12; // Col K (11), L (12)
      } else if (moduleId === 2) {
        targetCol = (linkType === "teacher") ? 16 : 17; // Col P (16), Q (17)
      } else if (moduleId === 4) {
        targetCol = (linkType === "teacher") ? 18 : 19; // Col R (18), S (19)
      } else if (moduleId === 6) {
        targetCol = (linkType === "teacher") ? 20 : 21; // Col T (20), U (21)
      } else if (moduleId === 8) {
        targetCol = (linkType === "teacher") ? 22 : 23; // Col V (22), W (23)
      }
      
      if (targetCol) {
        sheet.getRange(userRowIdx, targetCol).setValue(url);
        return makeJSONResponse({ success: true }, e);
      }
      return makeJSONResponse({ success: false, error: "Invalid module ID" }, e);
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

function getModuleLinksFromRow(row) {
  return {
    "1": { teacherLink: row[5] || "", galleryLink: row[6] || "" },   // S1 S1 (Col F, G)
    "3": { teacherLink: row[7] || "", galleryLink: row[12] || "" },  // S1 S2 (Col H, M)
    "5": { teacherLink: row[13] || "", galleryLink: row[14] || "" }, // S1 S3 (Col N, O)
    "7": { teacherLink: row[8] || "", galleryLink: row[9] || "" },   // S1 S4 (Col I, J)
    "9": { teacherLink: row[10] || "", galleryLink: row[11] || "" }, // S1 S5 (Col K, L)
    "2": { teacherLink: row[15] || "", galleryLink: row[16] || "" }, // S2 S1 (Col P, Q)
    "4": { teacherLink: row[17] || "", galleryLink: row[18] || "" }, // S2 S2 (Col R, S)
    "6": { teacherLink: row[19] || "", galleryLink: row[20] || "" }, // S2 S3 (Col T, U)
    "8": { teacherLink: row[21] || "", galleryLink: row[22] || "" }  // S2 S4 (Col V, W)
  };
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
