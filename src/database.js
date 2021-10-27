const { createClient } = require("@supabase/supabase-js");
const SUPABASE_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYyMjg0MjQ1NSwiZXhwIjoxOTM4NDE4NDU1fQ.XE2XkQfupseVJ1Jm-j4JAY8e4XVDNNN14wbdmTGmVXM";
const SUPABASE_URL = "https://grbsklhynhcjxsmswcmo.supabase.co";

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

export default supabase
