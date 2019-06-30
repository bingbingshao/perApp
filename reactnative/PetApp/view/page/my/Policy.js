/**
 * Created by bingPo on 2018/11/21.
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    TextInput,
    Dimensions,
    TouchableHighlight,
    ScrollView,
    Image
} from 'react-native';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Style from '../../css/Style';
import ETTStatus from "../../compont/ETTStatus"
import Global from '../../compont/Global';
import Hint from '../../compont/Hint';
import Loading from '../../compont/Loading';


export default class Policy extends Component {

    constructor(props) {
        super(props);
        this.state={
            loading:false,
        }
    }


    componentWillMount() {

    }
    /*
     * 点击事件
     */

    /*
     * 界面视图
     */
    _nav() {
        /*
         *  顶部导航
         */
        return (
            <View style={[Style.barTop]}>
                <ETTStatus/>
                <View style={[Style.barView, Style.flexRowBetween]}>
                    <TouchableHighlight
                        underlayColor={'transparent'}
                        onPress={() => this.props.navigation.goBack()}
                    >
                        <View style={[Style.icon_1, Style.flexRowCenter]}>
                            <EvilIcons name="chevron-left" size={40} color={Global.colors.fontColor_1}/>
                        </View>
                    </TouchableHighlight>
                    <TouchableHighlight
                        underlayColor={'transparent'}>
                        <View>
                            <Text style={[Style.barText,Style.font_1]}>隐私政策</Text>
                        </View>
                    </TouchableHighlight>
                    <TouchableHighlight
                        underlayColor={'transparent'}
                    >
                        <View style={[Style.icon_1, Style.flexRowCenter]}>
                        </View>
                    </TouchableHighlight>
                </View>
            </View>
        )
    };

    _daoyan = () => {
        return (
            <View style={styles.daoyan}>
                <Text style={styles.daoyanStyle}>目录</Text>
                <Text style={styles.daoyanDetail}>一、我们可能收集的信息</Text>
                <Text style={styles.daoyanDetail}>二、我们如何收集和使用信息</Text>
                <Text style={styles.daoyanDetail}>三、我们可能分享、转让和披露的信息</Text>
                <Text style={styles.daoyanDetail}>四、我们如何保留、储存和保护信息</Text>
                <Text style={styles.daoyanDetail}>五、如何管理您的信息</Text>
                <Text style={styles.daoyanDetail}>六、第三方服务</Text>
                <Text style={styles.daoyanDetail}>七、年龄限制</Text>
                <Text style={styles.daoyanDetail}>八、通知和修订</Text>
                <Text style={styles.daoyanDetail}>九、如何联系我们</Text>
            </View>
        );
    }

    _partOne = () => {
        return (
            <View>
                <View style={styles.boxRow}>
                    <Text style={styles.boxStyle}>一、我们可能收集的信息</Text>
                </View>
                <View style={styles.aggreeTip}>
                    <Text style={styles.aggreeTipStyle}>（一）与个人身份无关的信息：</Text>
                    <Text style={styles.aggreeTipDetail}>
                        当您使用宠物社区时，我们可能收集和汇总诸如用户的来源途径、访问顺序等信息，例如记录使用宠物社区的每个用户的来源途径、浏览器软件等。
                    </Text>
                    <Text style={styles.aggreeTipStyle}>（二）有关个人身份的信息：</Text>
                    <Text style={styles.aggreeTipDetail}>
                        当您使用宠物社区时，我们可能收集和汇总或要求您提供有关个人身份的信息，例如生日、籍贯、性别、兴趣爱好、个人电话号码、面部特征；位置信息（包括行程信息、精准定位信息、住宿信息、经纬度等）。
                    </Text>
                    <Text style={styles.aggreeTipDetail}>
                        我们收集您的信息主要是为了您和其他用户能够更容易和更满意地使用宠物社区。
                        宠物社区的目标是向所有的互联网用户提供安全、刺激、有趣及有教益的上网经历。而这些信息有助于我们实现这一目标。
                    </Text>
                    <Text style={styles.aggreeTipDetailLine}>
                        请注意，如您在宠物社区中其他用户可见的公开区域内上传或发布的信息中、您对其他人上传或发布的信息作出的回应中公开您的个人信息，该等信息可能会被他人收集并加以使用。
                        当您发现宠物社区的用户不正当地收集或使用您或他人的信息时，请联系1145603059@qq.com.
                    </Text>
                </View>
            </View>
        );
    }

    _partTwo = () => {
        return (
            <View>
                <View style={styles.boxRow}>
                    <Text style={styles.boxStyle}>二、我们如何收集和使用信息</Text>
                </View>
                <View style={styles.aggreeTip}>
                    <Text style={styles.aggreeTipStyle}>（一）我们将通过以下途径收集和获得您的信息：</Text>
                    <View style={{ paddingTop: 2, paddingBottom: 2, paddingLeft: 5 }}>
                        <Text style={styles.aggreeTipItems}>1、您提供的信息。例如：</Text>
                        <Text style={styles.aggreeTipItem}>
                            （1）您在注册宠物社区的帐号或使用宠物社区时，向我们提供的信息；
                        </Text>
                        <Text style={styles.aggreeTipItem}>
                            （2）您通过宠物社区向其他方提供的共享信息，以及您使用宠物社区时所储存的信息。
                        </Text>
                        <Text style={styles.aggreeTipItems}>
                            2、其他方分享的您的信息。
                            亦即其他方使用宠物社区时所提供有关您的共享信息。
                        </Text>
                        <Text style={styles.aggreeTipItems}>
                            3、我们获取的您的信息。您在使用宠物社区时，我们收集、汇总、记录的信息，例如日志信息、位置信息、设备信息等。
                        </Text>
                    </View>
                    <Text style={styles.aggreeTipStyle}>（二）COOKIES、日志档案和WEB BEACON</Text>
                    <Text style={styles.aggreeTipDetail}>
                        我们或我们的第三方合作伙伴可能通过COOKIES和WEB BEACON获取和使用您的信息，并将该等信息储存为日志信息。
                    </Text>
                    <Text style={styles.aggreeTipDetail}>
                        通过使用COOKIES，我们向用户提供简单易行并富个性化的网络体验。
                        一个COOKIES是少量的数据，它们从一个网络服务器送至您的浏览器并存在计算机硬盘上。
                        我们使用COOKIES是为了让其用户可以受益。
                        比如，为使得宠物社区虚拟社区的登录过程更快捷，您可以选择把用户名存在一个COOKIES中。
                        这样下次当您要登录宠物社区的服务时能更加方便快捷。
                        COOKIES能帮助我们确定您连接的页面和内容，您在宠物社区特定服务上花费的时间和您所选择的宠物社区。
                    </Text>
                    <Text style={styles.aggreeTipDetail}>
                        COOKIES使得我们能更好、更快地为您服务，并且使您在宠物社区上的经历更富个性化。
                        然而，您应该能够控制COOKIES是否以及怎样被你的浏览器接受。
                        请查阅您的浏览器附带的文件以获得更多这方面的信息。
                    </Text>
                    <Text style={styles.aggreeTipDetail}>
                        我们和第三方合作伙伴可能通过COOKIES和WEB BEACON收集和使用您的信息，并将该等信息储存。
                    </Text>
                    <View style={{ paddingTop: 2, paddingBottom: 2 }}>
                        <Text style={styles.aggreeTipItem}>
                            我们使用自己的COOKIES和WEB BEACON，用于以下用途：
                        </Text>
                        <View style={{ paddingLeft: 5 }}>
                            <Text style={styles.aggreeTipItem}>
                                （1）记住您的身份。
                                例如：COOKIES和WEB BEACON有助于我们辨认您作为我们的注册用户的身份，或保存您向我们提供有关您的喜好或其他信息；
                            </Text>
                            <Text style={styles.aggreeTipItem}>
                                （2）分析您使用我们服务的情况。我们可利用COOKIES和WEB BEACON来了解您使用宠物社区进行什么活动、或哪些服务或服务最受欢迎；及
                            </Text>
                            <Text style={styles.aggreeTipItem}>
                                （3）广告优化。COOKIES和WEB BEACON有助于我们根据您的信息，向您提供与您相关的广告而非进行普遍的广告投放。
                            </Text>
                        </View>
                    </View>
                    <Text style={styles.aggreeTipDetail}>
                        我们为上述目的使用COOKIES和WEB BEACON的同时，可能将通过COOKIES和WEB BEACON收集的非个人身份信息汇总提供给广告商和其他伙伴，用于分析您和其他用户如何使用宠物社区并用于广告服务。
                    </Text>
                    <Text style={styles.aggreeTipDetail}>
                        宠物社区上可能会有广告商和其他合作方放置的COOKIES和WEB BEACON。
                        这些COOKIES和WEB BEACON可能会收集与您相关的非个人身份信息，以用于分析用户如何使用该等服务、向您发送您可能感兴趣的广告，或用于评估广告服务的效果。
                        这些第三方COOKIES和WEB BEACON收集和使用该等信息不受本《隐私政策》约束，而是受到其自身的个人信息保护声明约束，我们不对第三方的COOKIES或WEB BEACON承担责任。
                    </Text>
                    <Text style={styles.aggreeTipDetail}>
                        您可以通过浏览器或用户选择机制拒绝或管理COOKIES或WEB BEACON。
                        但请您注意，如果您停用COOKIES或WEB BEACON，我们有可能无法为您提供最佳的服务体验，某些服务也可能无法正常使用。
                        同时，您仍然将收到广告，只是这些广告与您的相关性会降低。
                    </Text>
                    <Text style={styles.aggreeTipStyle}>（三）我们会出于以下目的，收集和使用您的信息：</Text>
                    <View style={{ paddingTop: 2, paddingBottom: 2 }}>
                        <Text style={styles.aggreeTipItems}>1、帮助您完成注册</Text>
                        <Text style={styles.aggreeTipItem}>
                            为便于我们为您提供服务，您需要提供基本注册信息，例如手机号码、电子邮箱地址等，并创建您的用户名和密码。
                            在部分单项服务中，如果您仅需使用浏览、搜索等基本服务，您不需要注册成为宠物社区用户及提供上述信息。
                        </Text>
                        <Text style={styles.aggreeTipItems}>2、向您提供商品或服务</Text>
                        <Text style={styles.aggreeTipItem}>
                            我们所收集和使用的信息是为您提供宠物社区的必要条件，如缺少相关信息，我们将无法为您提供宠物社区的核心内容，例如：
                        </Text>
                        <View style={{ paddingLeft: 5 }}>
                            <Text style={styles.aggreeTipItem}>
                                （1）在部分服务项目中，为便于向您交付商品或服务，您需提供收货人个人身份信息、姓名、收货地址、邮政编码、收货人、联系电话、支付状态等信息。
                                如果您拒绝提供此类信息，我们将无法完成相关交付服务。
                                如您通过宠物社区为其他人订购商品或服务，您需要提供该实际订购人的前述信息。
                                <Text style={styles.aggreeTipDetailLine}>向我们提供该实际订购人的前述信息之前，您需确保您已经取得其授权同意。</Text>
                            </Text>
                            <Text style={styles.aggreeTipItem}>
                                （2）为展示您账户的订单信息，我们会收集您在使用宠物社区过程中产生的订单信息用于向您展示及便于您对订单进行管理；
                            </Text>
                            <Text style={styles.aggreeTipItem}>
                                （3）当您与我们联系时，我们可能会保存您的通信/通话记录和内容或您留下的联系方式等信息，以便与您联系或帮助您解决问题，或记录相关问题的处理方案及结果。
                            </Text>
                            <Text style={styles.aggreeTipItem}>
                                （4）为确认交易状态及为您提供售后与争议解决服务，我们会通过您基于交易所选择的交易对象、支付机构、物流公司等收集与交易进度相关的您的交易、支付、物流信息，或将您的交易信息共享给上述服务提供者。
                            </Text>
                        </View>
                        <Text style={styles.aggreeTipItems}>3、向您推送消息</Text>
                        <Text style={styles.aggreeTipDetailLine}>
                            （1）为您展示和推送商品或服务。
                            我们可能使用您的信息，您的浏览及搜索记录、设备信息、位置信息、订单信息，提取您的浏览、搜索偏好、行为习惯、位置信息等特征，并基于特征标签通过电子邮件、短信或其他方式向您发送营销信息，提供或推广我们或第三方的如下商品和服务：
                        </Text>
                        <Text style={styles.aggreeTipItem}>
                            我们的商品和服务，包括但不限于：即时通讯服务、网上媒体服务、互动娱乐服务、社交网络服务、支付服务、互联网搜索服务、位置和地图服务、应用软件和服务、数据管理软件和服务、网上广告服务、互联网金融及其他社交媒体、娱乐、网络游戏、电子商务、资讯及通讯软件和服务（“互联网服务”）；
                        </Text>
                        <Text style={styles.aggreeTipItem}>
                            及第三方商品和服务，包括但不限于：互联网服务、食物和餐饮、体育、音乐、电影、电视、现场表演和其他艺术和娱乐、书册、杂志和其他刊物、服装和配饰、珠宝、化妆品、个人健康和卫生、电子、收藏品、家用器皿、电器、家居装饰和摆设、宠物、汽车、酒店、交通和旅游、银行、保险及金融服务、积分和奖励计划，以及我们认为可能与您相关的其他商品和服务。
                        </Text>
                        <Text style={styles.aggreeTipDetailLine}>
                            （2）向您发出通知。
                            我们可能在必需时（例如当我们由于系统维护而暂停某一单项服务、变更、终止提供某一单项服务时）向您发出与服务有关的通知。
                        </Text>
                        <Text style={styles.aggreeTipDetailLine}>
                            如您不希望继续接收我们推送的消息，您可要求我们停止推送，例如：根据短信退订指引要求我们停止发送推广短信，或在移动端设备中进行设置，不再接收我们推送的消息等；但我们依法律规定或单项服务的服务协议约定发送消息的情形除外。
                        </Text>
                        <Text style={styles.aggreeTipItems}>4、为您提供安全保障</Text>
                        <Text style={styles.aggreeTipDetailLine}>
                            为确保您身份真实性、向您提供更好的安全保障，您可以向我们提供身份证明、面部特征等生物识别信息等个人敏感信息以完成实名认证。
                        </Text>
                        <Text style={styles.aggreeTipDetailLine}>
                            除身份验证外，我们可能将您的信息用于客户服务、安全防范、诈骗监测、存档和备份等用途，确保我们向您提供的服务的安全性；
                            我们可能使用或整合我们所收集的您的信息，以及我们的合作伙伴取得您授权或依据法律共享的信息，来综合判断您账户及交易风险、进行身份验证、检测及防范安全事件，并依法采取必要的记录、审计、分析、处置措施。
                        </Text>
                        <Text style={styles.aggreeTipItems}>5、改进我们的服务</Text>
                        <Text style={styles.aggreeTipItem}>
                            我们可能将通过某一项宠物社区所收集的信息，用于我们的其他服务。
                            例如，在您使用某一项宠物社区时所收集的您的信息，可能在另一项宠物社区中用于向您提供特定内容或向您展示与您相关的、而非普遍推送的信息；
                            我们可能让您参与有关宠物社区的调查，帮助我们改善现有服务或设计新服务；
                            同时，我们可能将您的信息用于软件更新。
                        </Text>
                        <Text style={styles.aggreeTipDetailLine}>
                            您了解并同意，在收集您的信息后，我们将通过技术手段对数据进行去标识化处理，去标识化处理的信息将无法识别您的身份，在此情况下我们有权使用已经去标识化的信息，对用户数据库进行分析并予以商业化的利用。
                        </Text>
                        <Text style={styles.aggreeTipItem}>
                            如果我们将您的信息用于本《隐私政策》中未载明的其他用途，会事先征求您同意。
                        </Text>
                        <Text style={styles.aggreeTipItems}>6、征得授权同意的例外</Text>
                        <View style={{ paddingTop: 2, paddingBottom: 2 }}>
                            <Text style={styles.aggreeTipItem}>
                                根据相关法律法规规定，以下情形中收集您的信息无需征得您的授权同意：
                            </Text>
                            <Text style={styles.aggreeTipItem}>（1）与国家安全、国防安全有关的；</Text>
                            <Text style={styles.aggreeTipItem}>（2）与公共安全、公共卫生、重大公共利益有关的；</Text>
                            <Text style={styles.aggreeTipItem}>（3）与犯罪侦查、起诉、审判和判决执行等有关的；</Text>
                            <Text style={styles.aggreeTipItem}>（4）出于维护信息主体或其他个人的生命、财产等重大合法权益但又很难得到您本人同意的；</Text>
                            <Text style={styles.aggreeTipItem}>（5）所收集的信息是您自行向社会公众公开的；</Text>
                            <Text style={styles.aggreeTipItem}>（6）从合法公开披露的信息中收集信息的，如合法的新闻报道、政府信息公开等渠道；</Text>
                            <Text style={styles.aggreeTipItem}>（7）根据您的要求签订合同所必需的；</Text>
                            <Text style={styles.aggreeTipItem}>（8）用于维护宠物社区的安全稳定运行所必需的，例如发现、处置产品或服务的故障；</Text>
                            <Text style={styles.aggreeTipItem}>（9）为合法的新闻报道所必需的；</Text>
                            <Text style={styles.aggreeTipItem}>（10）学术研究机构基于公共利益开展统计或学术研究所必要，且对外提供学术研究或描述的结果时，对结果中所包含的信息进行去标识化处理的；</Text>
                            <Text style={styles.aggreeTipItem}>（11）法律法规规定的其他情形。</Text>
                        </View>
                    </View>
                </View>
            </View>
        );
    }

    _partThree = () => {
        return (
            <View>
                <View style={styles.boxRow}>
                    <Text style={styles.boxStyle}>三、我们可能分享、转让或披露的信息</Text>
                </View>
                <View style={styles.aggreeTip}>
                    <Text style={styles.aggreeTipStyle}>（一）分享</Text>
                    <Text style={styles.aggreeTipDetail}>
                        除以下情形外，未经您同意，我们不会与宠物社区之外的任何第三方分享您的信息：
                    </Text>
                    <View style={{ paddingTop: 2, paddingBottom: 2, paddingLeft: 5 }}>
                        <Text style={styles.aggreeTipItemLine}>
                            1、向您提供我们的服务。我们可能向合作伙伴及其他第三方分享您的信息，以实现您需要的核心功能或提供您需要的服务，例如：向物流服务商提供对应的订单信息；
                        </Text>
                        <Text style={styles.aggreeTipItemLine}>
                            2、维护和改善我们的服务。我们可能向合作伙伴及其他第三方分享您的信息，以帮助我们为您提供更有针对性、更完善的服务，例如：代表我们发出电子邮件或推送通知的通讯服务提供商等；
                        </Text>
                        <Text style={styles.aggreeTipItemLine}>
                            3、实现本《隐私政策》第二条“我们如何收集和使用信息”部分所述目的；
                        </Text>
                        <Text style={styles.aggreeTipItemLine}>
                            4、履行我们在本《隐私政策》或我们与您达成的其他协议中的义务和行使我们的权利；
                        </Text>
                        <Text style={styles.aggreeTipItemLine}>
                            5、向委托我们进行推广的合作伙伴等第三方共享，但我们仅会向这些委托方提供推广的覆盖面和有效性的信息，而不会提供可以识别您身份的信息，例如姓名电话号码或电子邮箱；或者我们将这些信息进行汇总，以便它不会识别您个人。
                            比如我们可以告知该委托方有多少人看了他们的推广信息或在看到这些信息后购买了委托方的商品，或者向他们提供不能识别个人身份的统计信息，帮助他们了解其受众或顾客。
                        </Text>
                        <Text style={styles.aggreeTipItem}>
                            6、在法律法规允许的范围内，为了遵守法律、维护我们及我们的关联方或合作伙伴、您或其他宠物社区用户或社会公众利益、财产或安全免遭损害，比如为防止欺诈等违法活动和减少信用风险，我们可能与其他公司和组织交换信息。
                            不过,这并不包括违反本《隐私政策》中所作的承诺而为获利目的出售、出租、共享或以其它方式披露的信息。
                        </Text>
                        <Text style={styles.aggreeTipItem}>
                            7、应您合法需求，协助处理您与他人的纠纷或争议；
                        </Text>
                        <Text style={styles.aggreeTipItem}>
                            8、应您的监护人合法要求而提供您的信息；
                        </Text>
                        <Text style={styles.aggreeTipItem}>
                            9、根据与您签署的单项服务协议（包括在线签署的电子协议以及相应的平台规则）或其他的法律文件约定所提供；
                        </Text>
                        <Text style={styles.aggreeTipItem}>
                            10、基于学术研究而提供；
                        </Text>
                        <Text style={styles.aggreeTipItem}>
                            11、基于符合法律法规的社会公共利益而提供。
                        </Text>
                    </View>
                    <Text style={styles.aggreeTipDetail}>
                        我们仅会出于合法、正当、必要、特定、明确的目的共享您的信息。
                        对我们与之共享信息的公司、组织和个人，我们会与其签署严格的保密协定，要求他们按照我们的说明、本《隐私政策》以及其他任何相关的保密和安全措施来处理信息。
                    </Text>
                    <Text style={styles.aggreeTipStyle}>（二）转让</Text>
                    <View style={{ paddingTop: 2, paddingBottom: 2, paddingLeft: 5 }}>
                        <Text>
                            <Text style={styles.aggreeTipItemLine}>
                                1、随着我们业务的持续发展，我们有可能进行合并、收购、资产转让或类似的交易，而您的信息有可能作为此类交易的一部分而被转移。
                            </Text>
                            <Text style={styles.aggreeTipItem}>
                                我们会要求新的持有您信息的公司、组织继续受本《隐私政策》的约束，否则,我们将要求该公司、组织重新向您征求授权同意。
                            </Text>
                        </Text>
                        <Text style={styles.aggreeTipItem}>
                            2、在获得您的明确同意后，我们会向其他方转让您的信息。
                        </Text>
                    </View>
                    <Text style={styles.aggreeTipStyle}>（三）披露</Text>
                    <Text style={styles.aggreeTipDetail}>
                        我们仅会在以下情况下，且采取符合业界标准的安全防护措施的前提下，才会披露您的信息：
                    </Text>
                    <View style={{ paddingTop: 2, paddingBottom: 2, paddingLeft: 5 }}>
                        <Text style={styles.aggreeTipItem}>
                            1、根据您的需求，在您明确同意的披露方式下披露您所指定的信息；
                        </Text>
                        <Text style={styles.aggreeTipItem}>
                            2、根据法律、法规的要求、强制性的行政执法或司法要求所必须提供您信息的情况下，我们可能会依据所要求的信息类型和披露方式披露您的信息。
                            在符合法律法规的前提下，当我们收到上述披露信息的请求时，我们会要求接收方必须出具与之相应的法律文件，如传票或调查函。
                            我们坚信，对于要求我们提供的信息，应该在法律允许的范围内尽可能保持透明。
                            我们对所有的请求都进行了慎重的审查，以确保其具备合法依据，且仅限于执法部门因特定调查目的且有合法权利获取的数据。
                        </Text>
                    </View>
                </View>
            </View>
        );
    }

    _partFour = () => {
        return (
            <View>
                <View style={styles.boxRow}>
                    <Text style={styles.boxStyle}>四、我们如何保留、储存和保护信息</Text>
                </View>
                <View style={styles.aggreeTip}>
                    <Text style={styles.aggreeTipDetail}>
                        我们仅在本《隐私政策》所述目的所必需期间和法律法规要求的时限内保留您的信息。
                    </Text>
                    <Text style={styles.aggreeTipDetail}>
                        我们在中华人民共和国境内运营中收集和产生的信息，存储在中国境内。
                    </Text>
                    <Text style={styles.aggreeTipDetail}>
                        我们将采取以下手段保护您的信息：
                    </Text>
                    <Text style={styles.aggreeTipStyle}>（一）数据安全技术措施</Text>
                    <Text style={styles.aggreeTipDetail}>
                        我们会采用符合业界标准的安全防护措施，包括建立合理的制度规范、安全技术来防止您的信息遭到未经授权的访问使用、修改,避免数据的损坏或丢失。
                        网络服务采取了多种加密技术，例如在某些服务中，我们将利用加密技术（例如SSL）来保护您的信息，采取加密技术对您的信息进行加密保存，并通过隔离技术进行隔离。
                    </Text>
                    <Text style={styles.aggreeTipDetail}>
                        在信息使用时，例如信息展示、信息关联计算，我们会采用多种数据脱敏技术增强信息在使用中安全性。
                        采用严格的数据访问权限控制和多重身份认证技术保护信息，避免数据被违规使用。
                    </Text>
                    <Text style={styles.aggreeTipStyle}>（二）我们为保护信息采取的其他安全措施</Text>
                    <Text style={styles.aggreeTipDetail}>
                        我们通过建立数据分类分级制度、数据安全管理规范、数据安全开发规范来管理规范信息的存储和使用。
                    </Text>
                    <Text style={styles.aggreeTipDetail}>
                        我们通过信息接触者保密协议、监控和审计机制来对数据进行全面安全控制。
                    </Text>
                    <Text style={styles.aggreeTipDetail}>
                        加强安全意识。我们还会举办安全和隐私保护培训课程，加强员工对于保护信息重要性的认识。
                    </Text>
                    <Text style={styles.aggreeTipStyleLine}>
                        （三）我们仅允许有必要知晓这些信息的宠物社区员工、合作伙伴访问您的信息，并为此设置了严格的访问权限控制和监控机制。
                        我们同时要求可能接触到您的信息的所有人员履行相应的保密义务。
                        如果未能履行这些义务，可能会被追究法律责任或被中止与宠物社区的合作关系。
                    </Text>
                    <Text style={styles.aggreeTipStyle}>（四）我们会采取一切合理可行的措施，确保未收集无关的信息。</Text>
                    <Text style={styles.aggreeTipStyle}>
                        （五）互联网并非绝对安全的环境，而且电子邮件、即时通讯、社交软件或其他服务软件等与其他用户的交流方式无法确定是否完全加密，我们建议您使用此类工具时请使用复杂密码，并注意保护您的信息安全。
                    </Text>
                    <Text style={styles.aggreeTipStyle}>
                        （六）互联网环境并非百分之百安全，我们将尽力确保或担保您发送给我们的任何信息的安全性。
                        如果我们的物理、技术、或管理防护设施遭到破坏，导致信息被非授权访问、公开披露、篡改、或毁坏，导致您的合法权益受损，我们将承担相应的法律责任。
                    </Text>
                    <Text style={styles.aggreeTipStyle}>（七）安全事件处置</Text>
                    <Text style={styles.aggreeTipDetail}>
                        在通过宠物社区与第三方进行沟通或购买商品及服务时，您不可避免的要向交易对方或潜在的交易对方披露自己的信息，如联络方式或者邮政地址等。
                        请您妥善保护自己的信息，仅在必要的情形下向他人提供。
                    </Text>
                    <Text style={styles.aggreeTipDetail}>
                        为应对信息泄露、损毁和丢失等可能出现的风险，我们制定了多项制度，明确安全事件、安全漏洞的分类分级标准及相应的处理流程。
                        我们也为安全事件建立了专门的应急响应团队，按照安全事件处置规范要求，针对不同安全事件启动安全预案，进行止损、分析、定位、制定补救措施、联合相关部门进行溯源和打击。
                    </Text>
                    <Text style={styles.aggreeTipDetail}>
                        已采取或将要采取的处置措施、您可自主防范和降低风险的建议、对您的补救措施等。
                        我们同时将及时将事件相关情况以邮件、信函、电话、推送通知等方式告知您，难以逐一告知信息主体时，我们会采取合理、有效的方式发布公告。
                        同时，我们还将按照监管部门要求，主动上报信息安全事件的处置情况。
                    </Text>
                    <Text style={styles.aggreeTipDetailLine}>
                        请您理解，由于技术的限制以及风险防范的局限，即便我们已经尽量加强安全措施，也无法始终保证信息百分之百的安全。
                        您需要了解，您接入宠物社区所用的系统和通讯网络，有可能因我们可控范围外的情况而发生问题。
                    </Text>
                </View>
            </View>
        );
    }

    _partFive = () => {
        return (
            <View>
                <View style={styles.boxRow}>
                    <Text style={styles.boxStyle}>五、如何管理您的信息</Text>
                </View>
                <View style={styles.aggreeTip}>
                    <Text style={styles.aggreeTipStyle}>（一）访问、更新和删除</Text>
                    <Text style={styles.aggreeTipDetail}>
                        我们鼓励您更新和修改您的信息以使其更准确有效。
                        您能通过宠物社区访问您的信息，并根据对应信息的管理方式自行完成或要求我们进行修改、补充和删除。
                        我们将采取适当的技术手段，尽可能保证您可以访问、更新和更正自己的信息或使用宠物社区时提供的其他信息。
                    </Text>
                    <Text style={styles.aggreeTipDetail}>
                        在访问、更新、更正和删除前述信息时，我们可能会要求您进行身份验证，以保障信息安全。
                        对于通过COOKIES和WEB BEACON收集的您的信息，我们还在本《隐私政策》第二条“COOKIES、日志档案和WEB BEACON”部分说明了向您提供的选择机制。
                        <Text style={styles.aggreeTipDetailLine}>
                            如您想查询、修改或删除您的部分信息，请登录宠物社区帐号中心（reg.163.com）或按照单项服务的具体指引进行操作。
                        </Text>
                    </Text>
                    <Text style={styles.aggreeTipStyle}>（二）公开与分享</Text>
                    <Text style={styles.aggreeTipDetail}>
                        我们的多项服务可让您不仅与您的社交网络、也与使用该服务的所有用户公开分享您的相关信息，例如，您在宠物社区中所上传或发布的信息、您对其他人上传或发布的信息作出的回应，通过电子邮件或在宠物社区中不特定用户可见的公开区域内上传或公布您的个人信息，以及包括与这些信息有关的位置数据和日志信息。
                        只要您不删除您所公开或共享的信息，有关信息可能一直留存在公众领域；即使您删除共享信息，有关信息仍可能由其他用户或不受我们控制的第三方独立地缓存、复制或储存，或由其他用户或该等第三方在公众领域保存。
                        <Text style={styles.aggreeTipDetailLine}>
                            如您将信息通过上述渠道公开或共享，由此造成您的信息泄露，我们不承担责任。
                            因此，我们提醒并请您慎重考虑是否通过上述渠道公开或共享您的信息。
                        </Text>
                    </Text>
                    <Text style={styles.aggreeTipStyle}>（三）注销</Text>
                    <Text style={styles.aggreeTipDetail}>
                        在符合宠物社区单项服务的服务协议约定条件及国家相关法律法规规定的情况下，您的该项宠物社区帐号可能被注销或删除。
                        当帐号注销或被删除后，与该帐号相关的、该单项服务项下的全部服务资料和数据将依照单项服务的服务协议约定删除或处理。
                    </Text>
                    <Text style={styles.aggreeTipStyle}>（四）改变您授权同意的范围</Text>
                    <Text style={styles.aggreeTipDetail}>
                        您总是可以选择是否披露信息。有些信息是使用宠物社区所必需的，但大多数其他信息的提供是由您决定的。
                        您可以通过删除信息、关闭设备功能等方式改变您授权我们继续收集信息的范围或撤回您的授权。
                    </Text>
                    <Text style={styles.aggreeTipDetailLine}>
                        当您撤回授权后，我们无法继续为您提供撤回授权所对应的服务，也不再处理您相应的信息。
                        但您撤回授权的决定，不会影响此前基于您的授权而开展的信息处理。
                    </Text>
                    <Text style={styles.aggreeTipStyle}>（五）有关敏感信息的提示</Text>
                    <Text style={styles.aggreeTipDetailLine}>
                        某些信息因其特殊性可能被认为是敏感信息，例如您的种族、宗教、个人健康和医疗信息等，以及身份证明文件、个人生物识别信息、财产信息、行踪轨迹、未成年人的信息等。
                    </Text>
                    <Text style={styles.aggreeTipDetailLine}>
                        请注意，您在宠物社区中所提供、上传或发布的内容和信息（例如有关您社交活动的照片或信息），可能会泄露您的敏感信息。您需要谨慎地考虑，是否使用宠物社区披露您的敏感信息。
                    </Text>
                    <Text style={styles.aggreeTipDetailLine}>
                        您同意您的敏感信息按本《隐私政策》所述的目的和方式来处理。
                    </Text>
                </View>
            </View>
        );
    }

    _partSix = () => {
        return (
            <View>
                <View style={styles.boxRow}>
                    <Text style={styles.boxStyle}>六、第三方服务</Text>
                </View>
                <View style={styles.aggreeTip}>
                    <Text style={styles.aggreeTipDetail}>
                        宠物社区可能链接至第三方提供的社交媒体或其他服务（包括网站或其他服务形式）。包括：
                    </Text>
                    <View style={{ paddingTop: 2, paddingBottom: 2, paddingLeft: 5 }}>
                        <Text style={styles.aggreeTipItem}>
                            （1）您可利用“分享”键将某些内容分享到宠物社区，或您可利用第三方服务登录宠物社区。这些功能可能会收集您的信息（包括您的日志信息），并可能在您的电脑装置COOKIES，从而正常运行上述功能；
                        </Text>
                        <Text style={styles.aggreeTipItem}>
                            （2）我们通过广告或我们服务的其他方式向您提供链接，使您可以接入第三方的服务或网站；
                        </Text>
                        <Text style={styles.aggreeTipItem}>
                            （3）及其他接入第三方服务的情形。
                        </Text>
                    </View>
                    <Text style={styles.aggreeTipDetailLine}>
                        该等第三方社交媒体或其他服务由相关的第三方负责运营。
                        您使用该等第三方的社交媒体服务或其他服务（包括您向该等第三方提供的任何信息），须受第三方自己的服务条款及信息保护声明（而非本《隐私政策》）约束，您需要仔细阅读其条款。
                        本《隐私政策》仅适用于我们所收集的任何信息，并不适用于任何第三方提供的服务或第三方的信息使用规则，而我们对任何第三方使用由您提供的信息不承担任何责任。
                    </Text>
                </View>
            </View>
        );
    }

    _partSeven = () => {
        return (
            <View>
                <View style={styles.boxRow}>
                    <Text style={styles.boxStyle}>七、年龄限制</Text>
                </View>
                <View style={styles.aggreeTip}>
                    <Text style={styles.aggreeTipDetail}>
                        我们建议：
                        <Text style={styles.aggreeTipDetailLine}>
                            任何未成年人参加网上活动应事先取得家长或其法定监护人（以下简称"监护人"）的同意。
                        </Text>
                        我们将根据国家相关法律法规的规定保护未成年人的相关信息。
                    </Text>
                    <Text style={styles.aggreeTipDetail}>
                        我们鼓励父母或监护人指导未成年人使用宠物社区。
                        我们建议未成年人鼓励他们的父母或监护人阅读本《隐私政策》，并建议未成年人在提交信息之前寻求父母或监护人的同意和指导。
                    </Text>
                </View>
            </View>
        );
    }

    _partEight = () => {
        return (
            <View>
                <View style={styles.boxRow}>
                    <Text style={styles.boxStyle}>八、通知和修订</Text>
                </View>
                <View style={styles.aggreeTip}>
                    <Text style={styles.aggreeTipDetailLine}>
                        我们可能适时修改本《隐私政策》的条款，该等修改构成本《隐私政策》的一部分。
                        对于重大变更，我们会提供更显著的通知，您可以选择停止使用宠物社区；
                        在该种情况下，如您仍然继续使用宠物社区的，即表示同意受经修订的本《隐私政策》的约束。
                    </Text>
                    <Text style={styles.aggreeTipDetail}>
                        任何修改都会将您的满意度置于首位。我们鼓励您在每次使用宠物社区时都查阅我们的隐私政策。
                    </Text>
                    <Text style={styles.aggreeTipDetailLine}>
                        我们可能在必需时（例如当我们由于系统维护而暂停某一项服务时）发出与服务有关的公告。
                        您可能无法取消这些与服务有关、性质不属于推广的公告。
                    </Text>
                    <Text style={styles.aggreeTipDetailLine}>
                        最后，您必须对您的账号和密码信息负有保密义务。任何情况下，请小心妥善保管。
                    </Text>
                </View>
            </View>
        );
    }

    _partNine = () => {
        return (
            <View>
                <View style={styles.boxRow}>
                    <Text style={styles.boxStyle}>九、如何联系我们</Text>
                </View>
                <View style={styles.aggreeTip}>
                    <Text style={styles.aggreeTipDetail}>
                        如您有关于网络信息安全的投诉和举报，或您对本《隐私政策》、您的信息的相关事宜有任何问题、意见或建议，以及有关本声明或宠物社区的隐私措施的问题请与宠物社区的协调人联系。
                        地址是<Text style={{ color: '#ff5b10' }}>Privacy@service.netease.com</Text>。
                    </Text>
                </View>
            </View>
        );
    }

    _bgImg = () => {
        return (
            <View>
                {this._partOne()}
                {this._partTwo()}
                {this._partThree()}
                {this._partFour()}
                {this._partFive()}
                {this._partSix()}
                {this._partSeven()}
                {this._partEight()}
                {this._partNine()}
            </View >
        );
    }


    render() {

        return (
            <View style={[styles.contains,Style.flexColumnCenter]}>
                {this._nav()}
                <ScrollView>
                    <View style={[styles.contains_center,{ marginBottom: 30,}]}>
                        {this._daoyan()}
                        {this._bgImg()}
                    </View>
                </ScrollView>
                {
                    this.state.loading ?
                        <Loading />
                        :null
                }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    contains:{
        flex:1,
        backgroundColor:Global.colors.fontColor_4,
    },
    contains_center:{
        width:Global.window.width-10,
    },
    container: {
        flex: 1,
        backgroundColor: '#ffe282',
    },
    // nav
    leftnav: {
        justifyContent: 'center',
        padding: 2,
        marginLeft: 10,
    },
    titleStyle: {
        lineHeight: 25,
        fontSize: 18,
        fontFamily: 'PingFangSC-Regular',
        fontWeight: 'bold',
        color: '#fff',
        letterSpacing: -0.57,
    },
    // daoyan
    daoyan: {
        paddingTop: 10,
        paddingBottom: 10,
    },
    daoyanStyle: {
        lineHeight: 24,
        fontSize: 14,
        fontWeight: 'bold',
        color: Global.colors.fontColor_1,
    },
    daoyanDetail: {
        lineHeight: 24,
        fontSize: 14,
        fontWeight: 'bold',
        color: Global.colors.fontColor_2,
        letterSpacing: -0.2,
    },
    //
    bgImg: {
        width: '100%',
        height: 60,
        resizeMode: 'stretch',
    },
    boxRow: {
        width: '60%',
        backgroundColor: Global.colors.fontColor_3,
        borderRadius: 10,
        shadowOffset: { width: 3, height: 3 },
        shadowRadius: 2,
        shadowColor:  Global.colors.fontColor_2,
        shadowOpacity: 1,
        padding: 7,
    },
    boxStyle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#fff',
    },
    aggreeTip: {
        borderRadius: 10,
        backgroundColor: '#fff',
        marginTop: 10,
        marginBottom: 10,
        padding: 10,
    },
    aggreeTipDetail: {
        lineHeight: 20,
        fontSize: 14,
        color: '#666',
        letterSpacing: -0.2,
        paddingTop: 5,
        paddingBottom: 5,
    },
    aggreeTipDetails: {
        lineHeight: 20,
        fontSize: 14,
        fontWeight: 'bold',
        color: '#444',
        letterSpacing: -0.2,
        paddingTop: 5,
        paddingBottom: 5,
    },
    aggreeTipItem: {
        lineHeight: 20,
        fontSize: 14,
        color: '#666',
        letterSpacing: -0.2,
    },
    aggreeTipItems: {
        lineHeight: 20,
        fontSize: 14,
        fontWeight: 'bold',
        color: '#444',
        letterSpacing: -0.2,
    },
});
