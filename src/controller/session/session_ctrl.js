const index = (req, res) => {
    res.render("session/index");
}

const setSession = (req, res )=>{
    req.session.name = "홍길동";
    req.session.age = 20;
    res.render("session/set_session");
}
const getSession = (req, res )=>{
    const sessionValue = {
        name : req.session.name, 
        age : req.session.age
    };
    res.render("session/get_session", sessionValue );
}
const delSession = (req, res)=>{
    // 특정 세션 하나만 삭제 (name)
    // delete req.session.name;

    // 모든 세션 삭제 (name, age)
    req.session.destroy();

    res.render("session/del_session");
}

const login = (req, res)=>{
    res.render("session/login", {nick : req.session.nick});
    // 로그인 성공한 사람은 세션이 넘어가고 아닌사람은 안넘어간다
}

const loginCheck = (req, res)=>{
    console.log("query: ", req.query); // {}
    console.log("params: ", req.params); // {}
    console.log("body: ", req.body); // { id: '111', pwd: '222' }
    // body 라이브러리 설치 : npm install body-parser --save
    
    console.log("==== login check ====");
    console.log(req.body.id);
    console.log(req.body["pwd"]);
    
    const DBid = "aaa", DBpwd = "111", nick="홍길동";
    if(DBid === req.body.id && DBpwd === req.body.pwd){
        req.session.id2 = DBid;
        req.session.nick = nick;
        return res.redirect("/session/success");
        // return 꼭 적어주기 안그러면 아래 내용과 충돌함
    }
    const msg = `<script>
                    alert("로그인 실패");
                    location.href="/session/login";
                </script>`;
    res.send(msg);
}

const success =(req, res) =>{
    if(req.session.id2){
        return res.render("session/success", {nick : req.session.nick});
    }
    const msg = `<script>
                alert("로그인해주세요");
                location.href="/session/login;
                </script>`;
    res.send(msg);
}

const logout = (req, res) =>{
    req.session.destroy( ()=> {
        console.log("모든 세션을 만료합니다");
    });
    res.redirect("/session/login");
}
module.exports = { index , setSession, getSession, delSession,
    login, loginCheck, success, logout };