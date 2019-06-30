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


export default class Service extends Component {

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
                            <Text style={[Style.barText,Style.font_1]}>服务条款</Text>
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
                <Text style={styles.daoyanStyle}>导言：</Text>
                <Text style={styles.daoyanDetail}>
                    欢迎使用由冰魄狼魂提供的宠物社区服务，本服务条款是您与宠物社区之间的服务条款。
                    在您注册成为宠物社区服务的客户之前，请仔细阅读以下全部内容（特别是加粗的内容）。
                    未成年人则应在法定监护人陪同下阅读。
                    如您使用宠物社区服务，即表示您自愿接受本服务条款的全部内容。
                    如果您不接受本服务条款，请不要安装、使用、注册或以其他方式使用云信的产品。
                    以下服务条款请您（以下简称“您”）详细阅读了解：
                </Text>
            </View>
        );
    }

    _partOne = () => {
        return (
            <View>
                <View style={styles.boxRow}>
                    <Text style={styles.boxStyle}>一、服务条款的确认和接纳</Text>
                </View>
                <View style={styles.aggreeTip}>
                    <Text style={styles.aggreeTipDetail}>
                        本服务条款内容包括条款正文、宠物社区服务已经发布的或将来可能发布的各类规则。
                        所有规则为本条款不可分割的组成部分，与条款正文具有同等效力。
                        除另行明确声明外，您使用宠物社区服务的行为都应当受本服务条款约束。
                    </Text>
                </View>
            </View>
        );
    }

    _partTwo = () => {
        return (
            <View>
                <View style={styles.boxRow}>
                    <Text style={styles.boxStyle}>二、宠物社区服务简介</Text>
                </View>
                <View style={styles.aggreeTip}>
                    <Text style={styles.aggreeTipDetail}>
                        本服务条款所称的宠物社区服务是指由冰魄狼魂所有和运营的宠物社区服务。
                        宠物社区服务的具体项目及功能详见《宠物社区服务说明》。
                    </Text>
                </View>
            </View>
        );
    }

    _partThree = () => {
        return (
            <View>
                <View style={styles.boxRow}>
                    <Text style={styles.boxStyle}>三、宠物社区的服务费用</Text>
                </View>
                <View style={styles.aggreeTip}>
                    <Text style={styles.aggreeTipDetail}>
                        •    宠物社区的服务费用标准已经在您订购页面进行了明示，您可以选择具体服务类型并按照明示的价格进行支付。
                        宠物社区服务的计费方式及价格等信息，以《宠物社区资费说明》为准。
                        您在登录宠物社区平台后，可以通过管理后台进行查看账户信息、提交订单、开通、中止或终止服务项目、充值及查看账单等操作。
                    </Text>
                    <Text style={styles.aggreeTipDetails}>
                        •    在您提交订单并在付费后方可享受宠物社区提供的服务。
                        如您提交订单后7日内未付款的，本服务条款及与您就服务达成的一切协议无效。
                    </Text>
                    <Text style={styles.aggreeTipDetails}>
                        •    您如需就充值金额开具发票的，需通过向客服邮箱发送电子邮件的形式提出要求，冰魄狼魂将在30个工作日内向您寄送发票。
                        发票信息和寄送信息以您提供的信息为准，由于信息不准确造成是后果不由冰魄狼魂承担。
                        如您需要纸质合同的，可以在订单确认后通过宠物社区后台生成您所使用的服务对应的，附有电子签章的合同。
                        此等合同及其所附带的电子签章只用于宠物社区线上系统订单，需要与线上系统订单、系统合同号以及电子合同一起方有效。
                    </Text>
                    <Text style={styles.aggreeTipDetail}>
                        •    服务期满后双方达成一致，继续由宠物社区向您提供服务的，您应至少在服务期满前7日支付续费款项。
                        如续费时宠物社区对产品名称、服务或价格进行了调整的，双方同意按照续约当时有效的新的产品名称、服务和价格由云信提供服务。
                    </Text>
                    <Text style={styles.aggreeTipDetail}>
                        •    冰魄狼魂在每月2日前向您提供账单并自您账户余额中扣除账户账单金额(短信技术服务费用按照您预付款金额直接折算为短信条数，按照发送数量实时扣除)，该账单应包含上月您对冰魄狼魂服务的使用情况及对应费用。
                        您对账单内容存在疑异的，有权与宠物社区客服联系，核对账单内容，该等核对工作以冰魄狼魂保存的数据为依据。
                    </Text>
                    <Text style={styles.aggreeTipDetail}>
                        •    您账户余额不足时，您应及时充值。
                        您账户余额不足以抵扣当月费用的，冰魄狼魂有权在向您提交当月对账单时起，暂停向您提供宠物社区服务，因此造成的任何损失，由您自行承担。
                    </Text>
                    <Text style={styles.aggreeTipDetail}>
                        •    宠物社区保留在您未按照约定支付全部费用之前不向您提供服务，或终止服务的权利；并且保留对您逾期支付行为追究法律责任的权利。
                    </Text>
                    <Text style={styles.aggreeTipDetails}>
                        •    您充分了解宠物社区的所有赠送服务项目和涉及价格的活动均为在正常服务价格之外的一次性特别优惠，优惠内容不包括赠送服务项目的修改、更新和维护费用，并且赠送服务项目不可折价冲抵服务价格、不可兑换现金。
                        如赠送宠物社区账户充值额的，需在实际支付部分消耗完毕后再消耗赠送部分。
                    </Text>
                </View>
            </View>
        );
    }

    _partFour = () => {
        return (
            <View>
                <View style={styles.boxRow}>
                    <Text style={styles.boxStyle}>四、宠物社区账号注册规则及管理</Text>
                </View>
                <View style={styles.aggreeTip}>
                    <Text style={styles.aggreeTipDetail}>
                        宠物社区账号注册资料包括但不限于您的账号名称、头像、密码、注册或更新宠物社区账号时输入的所有信息。
                    </Text>
                    <Text style={styles.aggreeTipDetail}>
                        •    您在注册宠物社区账号时承诺遵守法律法规、社会主义制度、国家利益、公民合法权益、公共秩序、社会道德风尚和信息真实性等七条底线，不得在宠物社区账号注册资料中出现违法和不良信息，且您保证在注册和使用账号时，不得有以下情形：
                    </Text>
                    <View style={{ paddingTop: 2, paddingBottom: 2, paddingLeft: 15 }}>
                        <Text style={styles.aggreeTipItem}>
                            •    违反宪法或法律法规规定的；
                        </Text>
                        <Text style={styles.aggreeTipItem}>
                            •    危害国家安全，泄露国家秘密，颠覆国家政权，破坏国家统一的；
                        </Text>
                        <Text style={styles.aggreeTipItem}>
                            •    损害国家荣誉和利益的，损害公共利益的；
                        </Text>
                        <Text style={styles.aggreeTipItem}>
                            •    煽动民族仇恨、民族歧视，破坏民族团结的；
                        </Text>
                        <Text style={styles.aggreeTipItem}>
                            •    破坏国家宗教政策，宣扬邪教和封建迷信的；
                        </Text>
                        <Text style={styles.aggreeTipItem}>
                            •    散布谣言，扰乱社会秩序，破坏社会稳定的；
                        </Text>
                        <Text style={styles.aggreeTipItem}>
                            •    散布淫秽、色情、赌博、暴力、凶杀、恐怖或者教唆犯罪的；侮辱或者诽谤他人，侵害他人合法权益的；
                        </Text>
                        <Text style={styles.aggreeTipItem}>
                            •    含有法律、行政法规禁止的其他内容的。
                        </Text>
                        <Text style={styles.aggreeTipItem}>
                            若您在注册、登录、使用账号头像、个人简介等账号信息资料存在违法和不良信息或包含有不正确、不真实信息的，冰魄狼魂有权采取通知限期改正、暂停使用、取消您资格等措施。
                            对于冒用关联机构或社会名人登录、使用、填写账号名称、头像、个人简介的，冰魄狼魂有权取消该账号的使用，并向政府主管部门进行报告。
                        </Text>
                    </View>
                    <Text style={styles.aggreeTipDetail}>
                        •    您应对其注册的宠物社区账号负责，您保证只有您本人可以使用您的宠物社区账号，该账号不可转让、不可赠与、不可继承。
                    </Text>
                    <Text style={styles.aggreeTipDetail}>
                        •    您对其注册的宠物社区服务及密码进行的一切操作负完全的责任，且您同意对其的账号和密码进行妥善保管，对于因密码泄露所致的损失，由您自行承担。
                        如您发现有他人冒用或盗用您的账号及密码或任何其他未经合法授权之情形时，应立即以有效方式通知冰魄狼魂，要求冰魄狼魂暂停相关服务。
                        同时，您理解冰魄狼魂对其的请求采取行动需要合理期限，在冰魄狼魂采取措施前，冰魄狼魂对已执行的指令及所导致的您的损失不承担任何责任。
                    </Text>
                </View>
            </View>
        );
    }

    _partFive = () => {
        return (
            <View>
                <View style={styles.boxRow}>
                    <Text style={styles.boxStyle}>五、宠物社区服务及服务条款的变更和中止</Text>
                </View>
                <View style={styles.aggreeTip}>
                    <Text style={styles.aggreeTipDetails}>
                        宠物社区服务始终在不断变更和改进服务。
                        宠物社区服务可能会增加或删除部分功能或服务，也可能暂停或彻底停止本产品。
                        如果宠物社区或本服务条款的内容发生重大变更，宠物社区应该提前30天在宠物社区网站或产品其他平台的适当位置公告重大变更的内容。
                        如您继续使用宠物社区产品或服务，则视为您接受上述变更。
                        如您不接受上述变更，您有权继续按照变更前的内容和标准使用变更部分的宠物社区服务直至该部分服务对应的有效订单下的预付款耗尽或停止使用宠物社区服务。
                        如您选择停止使用宠物社区服务，宠物社区应与您进行结算，并且您应将业务数据迁出。
                    </Text>
                </View>
            </View>
        );
    }

    _partSix = () => {
        return (
            <View>
                <View style={styles.boxRow}>
                    <Text style={styles.boxStyle}>六、隐私制度</Text>
                </View>
                <View style={styles.aggreeTip}>
                    <Text style={styles.aggreeTipDetail}>
                        •    尊重您个人隐私是冰魄狼魂的一项基本政策。
                        所以，冰魄狼魂不会公开或透露您的注册资料及保存在网易云服务中的非公开内容，除非冰魄狼魂在诚信的基础上认为透露这些信息在以下几种情况是必要的：
                    </Text>
                    <View style={{ paddingTop: 2, paddingBottom: 2, paddingLeft: 15 }}>
                        <Text style={styles.aggreeTipItem}>
                            •    事先获得您的明确授权；
                        </Text>
                        <Text style={styles.aggreeTipItem}>
                            •    或遵守有关法律规定，包括在国家有关机关查询时，提供您的注册信息、您在网易的网页上发布的信息内容及其发布时间、互联网地址或者域名；
                        </Text>
                        <Text style={styles.aggreeTipItem}>
                            •    或保持维护冰魄狼魂的知识产权和其他重要权利；
                        </Text>
                        <Text style={styles.aggreeTipItem}>
                            •    或在紧急情况下竭力维护您个人和社会大众的隐私安全；
                        </Text>
                        <Text style={styles.aggreeTipItem}>
                            •    或根据本条款相关规定或者冰魄狼魂认为必要的其他情况下。
                        </Text>
                    </View>
                    <Text style={styles.aggreeTipDetail}>
                        •    冰魄狼魂可能会与第三方合作向您提供宠物社区服务的相关服务，在此情况下，如该第三方同意承担与冰魄狼魂同等的保护您隐私的责任，则冰魄狼魂可将您的信息提供给该第三方。
                    </Text>
                    <Text style={styles.aggreeTipDetail}>
                        •    您使用宠物社区服务向第三方提供任何收费或免费的服务时，应充分尊重第三方的隐私，不得利用宠物社区服务进行任何侵害第三方隐私的行为。
                    </Text>
                </View>
            </View>
        );
    }

    _partSeven = () => {
        return (
            <View>
                <View style={styles.boxRow}>
                    <Text style={styles.boxStyle}>七、不可抗力条款</Text>
                </View>
                <View style={styles.aggreeTip}>
                    <Text style={styles.aggreeTipDetail}>
                        冰魄狼魂对不可抗力导致的损失不承担责任。
                        本服务条款所指不可抗力包括：天灾、法律法规或政府指令的变更，因网络服务特性而特有的原因，例如境内外基础电信运营商的故障、光缆等基础设施损坏、计算机或互联网相关技术缺陷、互联网覆盖范围限制、计算机病毒、黑客攻击等因素，及其他合法范围内的不能预见、不能避免并不能克服的客观情况。
                    </Text>
                </View>
            </View>
        );
    }

    _partEight = () => {
        return (
            <View>
                <View style={styles.boxRow}>
                    <Text style={styles.boxStyle}>八、使用规则</Text>
                </View>
                <View style={styles.aggreeTip}>
                    <Text style={styles.aggreeTipDetail}>
                        •    您有权选择宠物社区提供的服务内容，并获得宠物社区提供的技术支持。
                    </Text>
                    <Text style={styles.aggreeTipDetails}>
                        •    您保证您使用宠物社区服务或通过宠物社区服务发布内容时将遵从国家、地方法律法规、行业惯例和社会公共道德，并且不会利用宠物社区服务进行存储、发布、传播如下信息和内容：
                    </Text>
                    <View style={{ paddingTop: 2, paddingBottom: 2, paddingLeft: 15 }}>
                        <Text style={styles.aggreeTipItems}>
                            •    违反国家法律法规政策的任何内容（信息）；
                        </Text>
                        <Text style={styles.aggreeTipItems}>
                            •    违反国家规定的政治宣传或新闻信息；
                        </Text>
                        <Text style={styles.aggreeTipItems}>
                            •    涉及国家秘密或安全的信息；
                        </Text>
                        <Text style={styles.aggreeTipItems}>
                            •    封建迷信或淫秽、色情、下流的信息或教唆犯罪的信息；
                        </Text>
                        <Text style={styles.aggreeTipItems}>
                            •    博彩有奖、赌博游戏；
                        </Text>
                        <Text style={styles.aggreeTipItems}>
                            •    违反国家民族和宗教政策的信息；
                        </Text>
                        <Text style={styles.aggreeTipItems}>
                            •    妨碍互联网运行安全的信息；
                        </Text>
                        <Text style={styles.aggreeTipItems}>
                            •    侵害他人合法权益的信息；
                        </Text>
                        <Text style={styles.aggreeTipItems}>
                            •    其他有损于社会秩序、社会治安、公共道德的信息或内容。
                        </Text>
                        <Text style={styles.aggreeTipItems}>
                            如您有违反以上承诺的行为，则此等行为导致的后果与宠物社区无关。
                            如有确切记录证明您违反上述承诺的，宠物社区可以解除与您的服务合同关系并要求相应的赔偿。
                        </Text>
                    </View>
                    <Text style={styles.aggreeTipDetails}>
                        •    您应遵守宠物社区的所有其他规定和程序。
                        您须对其在使用宠物社区服务过程中的行为承担法律责任。
                        您承担法律责任的形式包括但不限于：对受到侵害者进行赔偿，以及在冰魄狼魂首先承担了因您的行为导致的行政处罚或侵权损害赔偿责任后，您应给予冰魄狼魂等额的赔偿。
                        若您违反以上规定，冰魄狼魂有权作出独立判断立即暂停或终止对您提供部分或全部服务，包括冻结、取消您的账号的使用权限等措施。
                    </Text>
                    <Text style={styles.aggreeTipDetails}>
                        •    对于您利用宠物社区所发布的信息，冰魄狼魂保留依据国家相关法律法规对其通讯的信息进行关键词过滤的权利，如发现您发送内容明确存在违反国家相关法律法规的，网易工商有权作出包括但不限于劝阻、拦截、直至向有关公安部门举报等行为。
                    </Text>
                    <Text style={styles.aggreeTipDetails}>
                        •    宠物社区公司或冰魄狼魂产品委托的第三方有权对您提供的应用产品及内容进行审核，包括但不限于内容审查、功能性测试、安全性测试等。
                        如果发现您的应用产品不符合国家法律法规、政策规定，或您提供的应用产品可能侵犯他人合法权益或含有对其他第三方的广告信息等内容，或其他认为不符合要求的情况，冰魄狼魂有权不向其提供服务；
                        已提供服务的，冰魄狼魂有权立即停止继续向其提供服务，并保存有关记录向相关主管部门报告。
                        但是，该项约定不视为冰魄狼魂对您提供的应用产品提供合法性担保，您应自行对应用产品提供保证，并承担由此引发的所有责任。
                    </Text>
                    <Text style={styles.aggreeTipDetails}>
                        •    如果您通过宠物社区提供的服务进行经营或者非经营性活动需要获得国家有关部门许可或批准的，应当获得有关的许可或批准。
                    </Text>
                    <Text style={styles.aggreeTipDetails}>
                        •    除经许可外，您不得修改、翻译、出版、改编、出租、转许可或以其他方式传播或转让宠物社区提供的服务或软件。
                        也不得逆向工程、反编译或试图以其他方式发现宠物社区的任何源代码。
                    </Text>
                    <Text style={styles.aggreeTipDetails}>
                        •    您保证不得滥用宠物社区服务，包括但不限于利用宠物社区服务进行侵害冰魄狼魂或他人的知识产权或者合法利益的其他行为，不得利用宠物社区服务向第三方提供与宠物社区服务直接竞争的服务等。
                        如宠物社区发现您违反本服务条款的约定，有权根据情况采取相应的处理措施，包括但不限于立即终止服务、中止服务或删除相应信息等。
                        如果第三方机构或个人对您提出质疑或投诉，宠物社区将通知您，您有责任在规定时间内进行说明并出具证明材料，如您未能提供相反证据或您逾期未能反馈的，宠物社区将采取包括但不限于立即终止服务、中止服务或删除相应信息等处理措施。
                        因您未及时更新联系方式或联系方式不正确而致使未能联系到您的，亦视为您逾期未能反馈。
                    </Text>
                    <Text style={styles.aggreeTipDetails}>
                        •    您了解宠物社区无法保证其所提供的服务毫无瑕疵，但宠物社区承诺不断提升服务质量及服务水平。
                        所以您同意：即使宠物社区提供的服务存在瑕疵，但上述瑕疵是当时行业技术水平所无法避免的，其将不被视为宠物社区违约。
                        您同意和宠物社区一同合作解决上述瑕疵问题。
                    </Text>
                </View>
            </View>
        );
    }

    _partNine = () => {
        return (
            <View>
                <View style={styles.boxRow}>
                    <Text style={styles.boxStyle}>九、服务承诺</Text>
                </View>
                <View style={styles.aggreeTip}>
                    <Text style={styles.aggreeTipDetail}>
                        •    宠物社区服务承诺以《宠物社区服务等级协议》为准。
                    </Text>
                    <Text style={styles.aggreeTipDetail}>
                        •    宠物社区对《宠物社区服务等级协议》中列明的责任负责，无论是否有相反约定，宠物社区责任限额不超过您当月使用宠物社区服务所支付的费用。
                    </Text>
                    <Text style={styles.aggreeTipDetail}>
                        •    除前述补偿外，宠物社区不因宠物社区服务给您造成的损失承担任何责任。
                    </Text>
                </View>
            </View>
        );
    }

    _partTen = () => {
        return (
            <View>
                <View style={styles.boxRow}>
                    <Text style={styles.boxStyle}>十、通知</Text>
                </View>
                <View style={styles.aggreeTip}>
                    <Text style={styles.aggreeTipDetails}>
                        所有发给您的通知都可通过电子邮件、常规的信件或在宠物社区适当位置公告的方式进行传送。
                        宠物社区服务将通过上述方法之一将消息传递给您，告知服务条款的修改、产品或服务变更、或其它重要事情。
                        为使您及时、全面了解冰魄狼魂提供的各项服务，您同意，冰魄狼魂可以多次、长期向您发送各类商业性短信息而无需另行获得您的同意。
                    </Text>
                </View>
            </View>
        );
    }

    _partEleven = () => {
        return (
            <View>
                <View style={styles.boxRow}>
                    <Text style={styles.boxStyle}>十一、内容、商标所有权</Text>
                </View>
                <View style={styles.aggreeTip}>
                    <Text style={styles.aggreeTipDetail}>
                        宠物社区服务，除涉及第三方授权的内容或技术外，均属于冰魄狼魂，并受中华人民共和国著作权法、商标法、专利法、反不正当竞争法和相应的国际条约以及其他知识产权法律法规的保护。
                        所以，您只能在冰魄狼魂授权下才能使用这些内容，未经冰魄狼魂产品书面同意，您不能为任何营利或非营利性的目的擅自复制、再造这些内容、或创造与内容有关的派生产品、或以转让、许可的方式授权第三方实施、利用和转让上述知识产权。
                        冰魄狼魂有权在服务中或经过服务在宠物社区服务中投放各种广告和宣传信息。
                        同时宠物社区、网易等本文中提及的产品和服务名称有可能为冰魄狼魂或其关联公司的商标，未经冰魄狼魂事先书面同意，您不得以任何方式展示或使用或作其他处理，也不得向他人表明您有权展示、使用、或其他有权处理的行为。
                    </Text>
                </View>
            </View>
        );
    }

    _partTwelve = () => {
        return (
            <View>
                <View style={styles.boxRow}>
                    <Text style={styles.boxStyle}>十二、信息储存及相关知识产权</Text>
                </View>
                <View style={styles.aggreeTip}>
                    <Text style={styles.aggreeTipDetail}>
                        宠物社区服务对其提供的所有服务将尽力维护其安全性及方便性，但对服务中出现的信息（包括但不限于您发布的信息）删除或储存失败不承担任何责任。
                        另外冰魄狼魂有权判定您的行为是否符合本服务条款的要求，如您违背了本服务条款的规定，冰魄狼魂有权中止或者终止您使用宠物社区服务。
                        宠物社区由冰魄狼魂研发。宠物社区的专利、版权、设计等知识产权，以及与宠物社区相关的所有信息内容，包括但不限于文字、图片、档案、资讯、资料、网站架构、页面设计均由冰魄狼魂依法享有知识产权。
                        冰魄狼魂尊重知识产权并注重保护您享有的各项权利。
                        在宠物社区所含服务中，您可能需要通过发表评论等各种方式向宠物社区提供内容。
                        在此情况下，您仍然享有此等内容的完整知识产权。
                        您在提供内容时将授予冰魄狼魂一项全球性的免费许可，允许冰魄狼魂使用、传播、复制、修改、再许可、翻译、创建衍生作品、出版及展示此等内容。
                    </Text>
                </View>
            </View>
        );
    }

    _partThirteen = () => {
        return (
            <View>
                <View style={styles.boxRow}>
                    <Text style={styles.boxStyle}>十三、保密</Text>
                </View>
                <View style={styles.aggreeTip}>
                    <Text style={styles.aggreeTipDetail}>
                        您和宠物社区对于因使用网易云服务而了解或接触到的对方的商业秘密及其他机密和信息，服务和协议内容及您使用宠物社区过程中产生的相关信息及往来文件（以下统称“保密信息”）均应保守秘密；
                        非经书面同意，不得向第三方泄露、给予或转让该保密信息。
                        本保密条款不因本协议的终止而终止。
                    </Text>
                </View>
            </View>
        );
    }

    _partFourteen = () => {
        return (
            <View>
                <View style={styles.boxRow}>
                    <Text style={styles.boxStyle}>十四、法律</Text>
                </View>
                <View style={styles.aggreeTip}>
                    <Text style={styles.aggreeTipDetail}>
                        本条款适用中华人民共和国的法律，并且排除一切冲突法规定的适用。
                        <Text style={styles.aggreeTipDetails}>
                            如您在使用本协议项下服务中出现纠纷的，您同意将纠纷交由中国国际经济贸易仲裁委员会仲裁解决，并由3名仲裁员进行审理。
                        </Text>
                    </Text>
                </View>
            </View>
        );
    }

    _partFifteen = () => {
        return (
            <View>
                <View style={styles.boxRow}>
                    <Text style={styles.boxStyle}>十五、其他</Text>
                </View>
                <View style={styles.aggreeTip}>
                    <Text style={styles.aggreeTipDetail}>
                        除非另有证明，冰魄狼魂储存在其服务器上的数据是您使用网易服务的唯一有效证据。
                    </Text>
                    <Text style={styles.aggreeTipDetail}>
                        本条款自发布之日起实施，并构成您和冰魄狼魂之间的共识。
                        冰魄狼魂不行使、未能及时行使或者未充分行使本条款或者按照法律规定所享有的权利，不应被视为放弃该权利，也不影响冰魄狼魂在将来行使该权利。
                    </Text>
                    <Text style={styles.aggreeTipDetail}>
                        如果您对本条款内容有任何疑问，请发送邮件至我们的客服邮箱：
                        <Text style={{ color:  Global.colors.fontColor_2}}>1145603059@qq.com</Text>。
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
                {this._partTen()}
                {this._partEleven()}
                {this._partTwelve()}
                {this._partThirteen()}
                {this._partFourteen()}
                {this._partFifteen()}
            </View >
        );
    }

    render() {

        return (
            <View style={[styles.contains,Style.flexColumnCenter]}>
                {this._nav()}
                <ScrollView>
                    <View style={[styles.contains_center,Style.flexColumnCenter,{ marginBottom: 30,}]}>
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
